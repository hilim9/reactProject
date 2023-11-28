import cookies from 'react-cookies';
import apiRequest from '../../lib/apiRequest';

/** 로그인 요청 API - 성공시 토큰 발급 */
export const requestLogin = (form) =>
  new Promise((resolve, reject) => {
    apiRequest('/member/token', 'POST', form)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          // 로그인 성공시 JWT 반환
          resolve(res.data.data);
        } else {
          // 실패시
          reject(res.data);
        }
      })
      .catch((err) => console.log('err', err));
  });

/** 로그인 회원 정보 조회 */
export const getUserInfo = () =>
  new Promise((resolve, reject) => {
    apiRequest('/member/info')
      .then((res) => {
        if (res.data.success) {
          // 로그인 상태인 경우 -> 회원정보 반환
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        // 만료된 토큰이면 제거
        cookies.remove('token');
        reject(err);
      });
  });