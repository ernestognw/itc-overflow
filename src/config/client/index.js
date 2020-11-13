import axios from 'axios';
import dotenv from 'dotenv';
import urljoin from 'urljoin';

dotenv.config();

const client = axios.create({
  baseURL: urljoin(process.env.REACT_APP_API_URL, 'api'),
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default client;
