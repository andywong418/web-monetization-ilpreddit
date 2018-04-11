const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'androswong', process.env.DATABASE_PASSWORD, {
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Models

// -- CORE --

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paymentPointer: {
    type: Sequelize.STRING,
  },
});

const Subreddit = sequelize.define('subreddit', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

const Post = sequelize.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
});

const Comment = sequelize.define('comment', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  gold: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
});

// -- JOIN related --

const PostVote = sequelize.define('post_vote', {
  upvote: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

const CommentVote = sequelize.define('comment_vote', {
  upvote: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
const Subscription = sequelize.define('subscriptions', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    autoIncrement: true
  }
});
// Associations

// Creation of subscriptions
User.belongsToMany(Subreddit, {
  as: 'Subscriber',
  through: 'subscriptions',
  foreignKey: 'userId',
});

Subreddit.belongsToMany(User, {
  as: 'Subscription',
  through: 'subscriptions',
  foreignKey: 'subredditId',
});

Subscription.belongsTo(User, {
  foreignKey: 'userId',
});

Subscription.belongsTo(Subreddit, {
  foreignKey: 'subredditId',
});

Subreddit.belongsTo(User, {
  foreignKey: 'ownerId',
});
// Post associations
Post.belongsTo(Subreddit, {
  foreignKey: 'subredditId',
});

Post.belongsTo(User, {
  foreignKey: 'op',
});

// Comment associations
Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

Comment.belongsTo(Comment, {
  foreignKey: 'parentId',
});

// PostVote associations
PostVote.belongsTo(User, {
  foreignKey: 'userId',
});

PostVote.belongsTo(Post, {
  foreignKey: 'postId',
});

// CommentVote associations
CommentVote.belongsTo(User, {
  foreignKey: 'userId',
});

CommentVote.belongsTo(Comment, {
  foreignKey: 'commentId',
});

module.exports = {
  sequelize,
  User,
  Subreddit,
  Post,
  Comment,
  PostVote,
  CommentVote,
  Subscription
};
