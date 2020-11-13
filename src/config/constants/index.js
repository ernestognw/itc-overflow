const orders = {
  asc: 'Ascending',
  desc: 'Descending',
};

const passwordRegex = /^(?=.*?[A-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9 ]).{8,}$/;

export { orders, passwordRegex };
