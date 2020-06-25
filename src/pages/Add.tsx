import React from 'react';
import { Redirect } from 'react-router-dom';

import useToken from '../hooks/useToken';
import AddContainer from '../containers/AddContainer';

const Add = () => {
  const token = useToken();
  if (token === null) {
    return <Redirect to="/signin" />;
  }
  return <AddContainer />;
};

export default Add;
