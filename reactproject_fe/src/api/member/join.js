import apiRequest from '../../lib/apiRequest';

export default function requestJoin(form) {
  return new Promise((resolve, reject) => {
    apiRequest('/member', 'POST', form)
      .then((res) => {
        if (res.data.success) {
          // data에 값이 담겨있음
          reject(res.data); // res.data: message 포함
        } else {
          resolve(true);
        }
      })
      .catch((err) => {});
  });
}
