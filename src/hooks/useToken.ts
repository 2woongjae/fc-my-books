import { useSelector } from 'react-redux';

import { RootState } from '../redux/modules/rootReducer';

export default function useToken() {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token,
  );

  return token;
}
