import axios from 'axios';
import cookies from 'react-cookies';

export default function apiRequest(
  url,
  method = 'GET',
  data = null,
  headers = null,
) {
  // http://localhost:3001/api/v1/member/join
  // url - https://gov.data

  // 정규 표현식 / 으로 시작
  if (!/^http[s]?/i.test(url)) {
    // 외부 api인 경우 http(s)로 시작, 내부 api인경우 localhost:3001 고정
    url = process.env.REACT_APP_API_URL + url;
  }

  // method = method || 'GET' 도 가능

  // 요청 데이터(data) 있고, method가 GET 방식 -> 쿼리스트링으로 변환

  if (method.toUpperCase() === 'GET' && data) {
    // 요청메서드를 소문자로(get) 입력할 경우 처리

    const searchkParams = new URLSearchParams(data);
    url += `?${searchkParams.toString()}`;
    data = null;
  }

  console.log(url, method, data, headers);

  const token = cookies.load('token');
  if (token) {
    headers = headers || {}; // 비어있을때 객체 생성
    headers.Authorization = `Bearer ${token}`;
  }

  return axios({
    method,
    url,
    data,
    headers,
    validateStatus: (state) => state < 500, // 500대 에러 밑으로는 오류가 발생해도 정상적으로 처리
  });
}
