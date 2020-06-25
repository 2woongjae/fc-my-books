import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goBack, push } from 'connected-react-router';
import { useParams } from 'react-router-dom';

import Detail from '../components/Detail';
import { RootState } from '../redux/modules/rootReducer';
import { BookResType } from '../types';
import { logout as logoutSaga } from '../redux/modules/auth';
import { getBooks as getBooksSaga } from '../redux/modules/books';

const DetailContainer = () => {
  const { id } = useParams();
  const bookId = Number(id) || -1;
  const books = useSelector<RootState, BookResType[] | null>(
    (state) => state.books.books,
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error,
  );

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSaga());
  }, [dispatch]);

  const back = useCallback(() => {
    dispatch(goBack());
  }, [dispatch]);

  const edit = useCallback(() => {
    dispatch(push(`/edit/${id}`));
  }, [dispatch, id]);

  const logout = useCallback(() => {
    dispatch(logoutSaga());
  }, [dispatch]);

  return (
    <Detail
      book={
        books === null ? null : books.find((book) => book.bookId === bookId)
      }
      error={error}
      getBooks={getBooks}
      back={back}
      edit={edit}
      logout={logout}
    />
  );
};

export default DetailContainer;
