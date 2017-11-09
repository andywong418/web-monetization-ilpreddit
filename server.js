const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

const auth = require('./backend/authRoutes');
const api = require('./backend/routes');
const bodyParser = require('body-parser');
const flash = require('connect-flash');


// configure req.flash()
app.use(flash());

// passport configuration
require('./backend/config/passport')(passport);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

// CORS setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/public/index.html`); // For React/Redux
});

app.use('/api', auth(passport));
app.use('/api', api);

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
  }
});
