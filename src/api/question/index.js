import client from '@config/client';

const question = {
  getAll: async ({ user }) => {
    const params = new URLSearchParams();
    const endpoint = '/question';

    if (user) params.set('user', user);

    const { data } = await client.get(`${endpoint}?${params.toString()}`);
    return data;
  },
};

export default question;
