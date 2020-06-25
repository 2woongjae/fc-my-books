import { AnyAction } from 'redux';
import { createActions, handleActions } from 'redux-actions';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import { LoginReqType } from '../../types';
import { getTokenFromState } from '../utils';
import { success as booksSuccess } from './books';
import UserService from '../../services/UserService';
import TokenService from '../../services/TokenService';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const options = {
  prefix: 'my-books/auth',
};

export const { success, pending, fail } = createActions(
  {
    SUCCESS: (token: string) => ({ token }),
  },
  'PENDING',
  'FAIL',
  options,
);

const reducer = handleActions<AuthState, any>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      token: action.payload.token,
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

export const { login, logout } = createActions(
  {
    LOGIN: ({ email, password }: LoginReqType) => ({
      email,
      password,
    }),
  },
  'LOGOUT',
  options,
);

export function* sagas() {
  yield takeEvery(`${options.prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${options.prefix}/LOGOUT`, logoutSaga);
}

interface LoginSagaAction extends AnyAction {
  payload: LoginReqType;
}

function* loginSaga(action: LoginSagaAction) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    TokenService.set(token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

function* logoutSaga() {
  try {
    yield put(booksSuccess(null));
    yield put(pending());
    const token: string = yield select(getTokenFromState);
    yield call(UserService.logout, token);
  } catch (error) {
    // console.log(error);
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}
