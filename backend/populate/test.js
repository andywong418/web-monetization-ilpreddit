const { User } = require('../models');

const createMason = async () => {
  await User.create({
    username: 'Mason',
    password: 'hi',
  });
};

createMason();
