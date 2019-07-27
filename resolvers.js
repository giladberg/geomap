const user = {
  _id: '1',
  name: 'gilad',
  email: 'giladberg@gmail.com',
  picture: 'https://cloudinary.com/asdf'
};

module.exports = {
  Query: {
    me: () => user
  }
};
