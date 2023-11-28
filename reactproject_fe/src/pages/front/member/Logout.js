import Cookies from 'react-cookies';
import React, { useContext } from 'react';
import UserContext from '../../../modules/user';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  /*
        1. 쿠키 삭제
        2. isLogin -> false, isAdmin = false
        3. userInfo -> {}
    */

  Cookies.remove('token', { path: '/' });
  const {
    action: { setIsLogin, setIsAdmin, setUserInfo },
  } = useContext(UserContext);
  setIsLogin(false);
  setIsAdmin(false);
  setUserInfo(false);

  return <Navigate to="/login" replace={true} />;
};

export default React.memo(Logout);
