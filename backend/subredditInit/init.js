const { Subreddit } = require('../models');

const createHorizons = async () => {
  Subreddit.create({
    name: 'Ripple',
    description: 'All things related to the company - from new partnerships to discussions on other use cases.'
  });
};

createHorizons();
