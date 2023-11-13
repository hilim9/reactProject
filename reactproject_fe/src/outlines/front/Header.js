import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

const OuterBox = styled.header`
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 15px;

  .right {
    a {
      display: inline-block;
      border: 1px solid #596b99;
      height: 28px;
      border-radius: 3px;
      line-height: 26px;
      color: #596b99;
      font-weight: 700;
      width: 90px;
      text-align: center;
      margin-left: 5px;

      &.on,
      &:hover {
        background: #596b99;
        color: #fff;
      }
    }
  }
`;

const Header = () => {
  const { t } = useTranslation();
  return (
    <OuterBox>
      <div className="left">
        <NavLink to="/">로고</NavLink>
      </div>
      <div className="right">
        <NavLink
          to="/login"
          className={({ isActive }) => classNames({ on: isActive })}
        >
          {t('로그인')}
        </NavLink>
        <NavLink
          to="/join"
          className={({ isActive }) => classNames({ on: isActive })}
        >
          {t('회원가입')}
        </NavLink>
      </div>
    </OuterBox>
  );
};

export default Header;
