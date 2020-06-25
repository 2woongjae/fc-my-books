import { all } from 'redux-saga/effects';

import { sagas as authSagas } from './auth';
import { sagas as booksSagas } from './books';

export default function* rootSaga() {
  yield all([authSagas(), booksSagas()]);
}
