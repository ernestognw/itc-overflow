import client from '@config/client';

const question = {
  getAll: async () => {
    const { data } = await client.get('/question');
    return data;
  },
};

export default question;
