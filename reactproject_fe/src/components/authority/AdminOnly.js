import React, { useContext } from 'react';
import UserContext from '../../modules/user';

const AdminOnly = ({ children }) => {
  const {
    state: { isAdmin },
  } = useContext(UserContext);

  return isAdmin ? children : <h1>접근 권한 X</h1>;
};

export default AdminOnly;
