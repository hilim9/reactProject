import React, { useContext, useEffect } from 'react';
import UserContext from '../../modules/user';
import LoginContainer from '../../containers/member/LoginContainer';
import MainClassContext from '../../modules/mainClass';

const MemberOnly = ({ children }) => {
  const {
    state: { isLogin },
  } = useContext(UserContext);

  const { setMainClass } = useContext(MainClassContext);

  useEffect(() => {
    setMainClass(() => (isLogin ? 'mypage_page' : 'login_page'));
  }, [isLogin, setMainClass]);

  return isLogin ? children : <LoginContainer />;
};

export default React.memo(MemberOnly);
