import client from '@config/client';

const question = {
  getAll: async ({ user, order, sortBy, searchBy, search }) => {
    const params = new URLSearchParams();
    const endpoint = '/question';

    if (user) params.set('user', user);

    if (sortBy && sortBy.length > 0 && order) {
      params.set('sortBy', sortBy);
      params.set('order', order);
    }

    if (searchBy && search) {
      params.set('searchBy', searchBy);
      params.set('search', search);
    }

    const { data } = await client.get(`${endpoint}?${params.toString()}`);
    return data;
  },
  create: async ({ title, content }) => {
    const { data } = await client.post('/question', { title, content });
    return data;
  },
};

export default question;
