import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { goBack } from 'connected-react-router';

import Edit from '../components/Edit';
import { RootState } from '../redux/modules/rootReducer';
import { BookResType } from '../types';
import { logout as logoutSaga } from '../redux/modules/auth';
import {
  editBook as editBookSaga,
  getBooks as getBooksSaga,
} from '../redux/modules/books';

const EditContainer = () => {
  const { id } = useParams();
  const bookId = Number(id) || -1;
  const books = useSelector<RootState, BookResType[] | null>(
    (state) => state.books.books,
  );
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading,
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error,
  );
  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const edit = useCallback(
    (book) => {
      dispatch(editBookSaga(bookId, book));
    },
    [dispatch, bookId],
  );

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  return (
    <Edit
      book={
        books === null ? null : books.find((book) => book.bookId === bookId)
      }
      loading={loading}
      error={error}
      edit={edit}
      getBooks={getBooks}
      back={back}
      logout={logout}
    />
  );
};

export default EditContainer;
