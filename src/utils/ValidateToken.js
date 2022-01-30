import axios from 'axios';

const generateAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  const form_data = new FormData();
  form_data.append('client_id', process.env.REACT_APP_CLIENT_ID);
  form_data.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
  form_data.append('refresh_token', refreshToken);
  form_data.append('grant_type', 'refresh_token');
  await axios({
    method: 'post',
    url: 'https://oauth2.googleapis.com/token',
    data: form_data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => {
      localStorage.setItem('access_token', res.data.access_token);
      return res;
    })
    .catch(() => {
      localStorage.clear();
    });
};

export async function validateAccessToken() {
  await axios({
    method: 'get',
    url: `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${localStorage.getItem(
      'access_token',
    )}`,
    /* eslint-disable */
  })
    .then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        const response = generateAccessToken();
        response.then(() => {
          return res;
        });
      }
    })
    .catch(() => {
      localStorage.clear();
    });
}
