const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const monetizerRoute = (monetizer) => {
  router.get(monetizer.receiverEndpointUrl, monetizer.receive.bind(monetizer));
  return router;
};

module.exports = monetizerRoute;
