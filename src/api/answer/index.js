import client from '@config/client';

const answer = {
  getAll: async ({ user, order, sortBy }) => {
    const params = new URLSearchParams();
    const endpoint = '/answer';

    if (user) params.set('user', user);

    if (sortBy && sortBy.length > 0 && order) {
      params.set('sortBy', sortBy);
      params.set('order', order);
    }

    const { data } = await client.get(`${endpoint}?${params.toString()}`);
    return data;
  },
  create: async ({ questionId, content }) => {
    const { data } = await client.post('/answer', { questionId, content });
    return data;
  },
};

export default answer;
