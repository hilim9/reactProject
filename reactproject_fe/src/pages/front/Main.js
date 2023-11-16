import LoginContainer from '../../containers/member/LoginContainer';
import UserContext from '../../modules/user';
import { useContext, useCallback } from 'react';

const Main = () => {
  //return <TestComponent>{(value) => value * value}</TestComponent>;
  const {
    state: { isLogin, userInfo },
    action: { setIsLogin, setUserInfo },
  } = useContext(UserContext);

  return isLogin ? (
    <h1>메인페이지: {userInfo.userNm}</h1>
  ) : (
    <LoginContainer setIsLogin={setIsLogin} setUserInfo={setUserInfo} />
  );
  /*
  const handleClick = () => {
    setIsLogin(true);
    setUserInfo({ userNm: '이이름' });
  };

  return isLogin ? (
    <h1>메인페이지: {userInfo.userNm}</h1>
  ) : (
    <>
      <LoginContainer />
      <button type="button" onClick={handleClick}>
        로그인 하기
      </button>
    </>
  );*/
};

/*
const TestComponent = ({ children }) => {
  return children(10);
}; */

export default Main;
