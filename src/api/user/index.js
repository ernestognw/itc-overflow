import axios from 'axios';
import client from '@config/client';

const user = {
  getAll: async () => {
    const { data } = await client.get('/user');
    return data;
  },
  get: async (id) => {
    const { data } = await client.get(`/user/${id}`);
    return data;
  },
};

export default user;
