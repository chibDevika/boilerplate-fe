import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://leave-tracker-demo.herokuapp.com/',
});

export default instance;
