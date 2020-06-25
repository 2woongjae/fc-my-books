import React from 'react';
import { Redirect } from 'react-router-dom';

import useToken from '../hooks/useToken';
import ListContainer from '../containers/ListContainer';

const Home: React.FC = () => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <ListContainer />;
};

export default Home;
