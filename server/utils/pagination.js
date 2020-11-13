const getPaginateParams = ({ query }) => {
  const { page, pageSize } = query;

  return {
    page: page || 1,
    pageSize: page || 20,
  };
};

const paginate = ({ results, count, params }) => {
  const { page, pageSize } = params;
  const pages = Math.ceil(count / pageSize);
  const prev = page > 1 ? page - 1 : null;
  const next = page < pages ? page + 1 : null;
  const result = {
    info: {
      count,
      pages,
      prev,
      next,
    },
    results,
  };

  return result;
};

export { getPaginateParams, paginate };
