import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from 'connected-react-router';

import Add from '../components/Add';
import { RootState } from '../redux/modules/rootReducer';
import { logout as logoutSaga } from '../redux/modules/auth';
import {
  addBook as addBookSaga,
  getBooks as getBooksSaga,
} from '../redux/modules/books';
import { BookReqType, BookResType } from '../types';

const AddContainer = () => {
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

  const add = useCallback(
    (book: BookReqType) => {
      dispatch(addBookSaga(book));
    },
    [dispatch],
  );

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  return (
    <Add
      books={books}
      loading={loading}
      error={error}
      add={add}
      getBooks={getBooks}
      back={back}
      logout={logout}
    />
  );
};

export default AddContainer;
