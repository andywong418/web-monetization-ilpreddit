const express = require('express');
const { User, Post, Subreddit, Subscription } = require('../models');
const plugin = require('ilp-plugin')();
const SPSP = require('ilp-protocol-spsp');

const router = express.Router();


router.post('/new', async(req, res) => {
  if (!(req.body.title && req.body.description)) {
    return res.status(400).json({
      success: false,
      error: 'You must send title and description in your request!',
    });
  }
  const subreddit = await Subreddit.create({
    name: req.body.title,
    description: req.body.description,
    ownerId: req.user.id,
  });

  return res.status(200).send(subreddit);
})

router.post('/subscribe', async(req, res) => {
  const subredditId = req.body.subredditId;
  // Create subscription and pay owner of subreddit
  // await req.awaitBalance(200);
  req.spend(200);
  const subredditPromise = await Subreddit.findById(subredditId);
  if(subredditPromise.ownerId) {
    const userPromise = await User.findById(subredditPromise.ownerId);
    console.log('connecting plugin');
    await plugin.connect();
    console.log('sending payment to ' + userPromise.paymentPointer );
    await SPSP.pay(plugin, {
      receiver: userPromise.paymentPointer,
      sourceAmount: '200'
    });
    console.log("paid");
  }

  let subscription = await Subscription.create({
    userId: req.user.id,
    subredditId,
  })
  subscription = subscription.get();
  res.status(200).json({subscription, subreddit: subredditPromise.get()});
})

router.get('/subscriptions', async(req, res) => {
  const userId = req.user.id;
  let subscriptions = await Subscription.findAll({ where: { userId }, include: [{ model: Subreddit }] });
  if(subscriptions) {
    subscriptions = subscriptions.map(subscription => subscription.get());
  }
  res.status(200).send(subscriptions);
})
module.exports = router;
