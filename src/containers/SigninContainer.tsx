import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Signin from '../components/Signin';
import { RootState } from '../redux/modules/rootReducer';
import { login as loginSaga } from '../redux/modules/auth';
import { LoginReqType } from '../types';

const SigninContainer: React.FC = () => {
  const loading = useSelector<RootState, boolean>(
    (state) => state.auth.loading,
  );
  const error = useSelector<RootState, Error | null>(
    (state) => state.auth.error,
  );
  const dispatch = useDispatch();

  const login = useCallback(
    ({ email, password }: LoginReqType) => {
      dispatch(loginSaga({ email, password }));
    },
    [dispatch],
  );

  return <Signin loading={loading} error={error} login={login} />;
};

export default SigninContainer;
