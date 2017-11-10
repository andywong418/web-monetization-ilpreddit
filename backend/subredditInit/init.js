const { Subreddit } = require('../models');

const createHorizons = async () => {
  Subreddit.create({
    name: 'Horizons',
  });
};

createHorizons();
