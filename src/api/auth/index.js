import client from '@config/client';

const auth = {
  logIn: async ({ email, password }) => {
    const { data } = await client.post('/auth/login', { email, password });
    return data;
  },
};

export default auth;
