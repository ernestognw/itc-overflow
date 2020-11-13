import client from '@config/client';

const auth = {
  logIn: async ({ email, password }) => {
    const { data } = await client.post('/auth/login', { email, password });
    return data;
  },
  signUp: async ({ firstName, lastName, email, password }) => {
    const { data } = await client.post('/auth/signup', { firstName, lastName, email, password });
    return data;
  },
};

export default auth;
