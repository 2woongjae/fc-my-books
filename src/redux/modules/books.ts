import { AnyAction } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import BookService from '../../services/BookService';
import { BookResType, BookReqType } from '../../types';
import { getTokenFromState, getBooksFromState } from '../utils';

export interface BooksState {
  books: BookResType[] | null;
  loading: boolean;
  error: Error | null;
}

const initialState: BooksState = {
  books: null,
  loading: false,
  error: null,
};

const options = {
  prefix: 'my-books/books',
};

export const { success, pending, fail } = createActions(
  {
    SUCCESS: (books) => ({ books }),
  },
  'PENDING',
  'FAIL',
  options,
);

const reducer = handleActions<BooksState, any>(
  {
    PENDING: (state, action) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default reducer;

export const { addBook, editBook, deleteBook, getBooks } = createActions(
  {
    ADD_BOOK: (book: BookReqType) => ({
      book,
    }),
    EDIT_BOOK: (bookId: number, book: BookReqType) => ({
      bookId,
      book,
    }),
    DELETE_BOOK: (bookId: string) => ({ bookId }),
  },
  'GET_BOOKS',
  options,
);

export function* sagas() {
  yield takeEvery(`${options.prefix}/GET_BOOKS`, getBooksSaga);
  yield takeEvery(`${options.prefix}/ADD_BOOK`, addBookSaga);
  yield takeEvery(`${options.prefix}/EDIT_BOOK`, editBookSaga);
  yield takeEvery(`${options.prefix}/DELETE_BOOK`, deleteBookSaga);
}

function* getBooksSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    const books: BookResType[] = yield call(BookService.getBooks, token);
    yield put(success(books));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface AddBookSagaAction extends AnyAction {
  payload: {
    book: BookReqType;
  };
}

function* addBookSaga(action: AddBookSagaAction) {
  try {
    yield put(pending());
    const token: string = yield select(getTokenFromState);
    const book: BookResType = yield call(
      BookService.addBook,
      token,
      action.payload.book,
    );
    const books: BookResType[] = yield select(getBooksFromState);
    yield put(success([...books, book]));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface EditBookSagaAction extends AnyAction {
  payload: {
    bookId: number;
    book: BookReqType;
  };
}

function* editBookSaga(action: EditBookSagaAction) {
  try {
    yield put(pending());
    const token: string = yield select(getTokenFromState);
    const newBook = yield call(
      BookService.editBook,
      token,
      action.payload.bookId,
      action.payload.book,
    );
    const books: BookResType[] = yield select(getBooksFromState);
    yield put(
      success(
        books.map((book) => (book.bookId === newBook.bookId ? newBook : book)),
      ),
    );
    yield put(push('/'));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

interface DeleteBookSagaAction extends AnyAction {
  payload: {
    bookId: number;
  };
}

function* deleteBookSaga(action: DeleteBookSagaAction) {
  try {
    const { bookId } = action.payload;
    yield put(pending());
    const token: string = yield select(getTokenFromState);
    yield call(BookService.deleteBook, token, bookId);
    const books: BookResType[] = yield select(getBooksFromState);
    yield put(success(books.filter((book) => book.bookId !== bookId)));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}
