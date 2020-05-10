require('dotenv').config();
// base
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// cube.js
const redis = require('redis');
const session = require('express-session');
const serveStatic = require('serve-static');
const CubejsServerCore = require('@cubejs-backend/server-core');
// security
const { BasicStrategy } = require('passport-http');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const CUBE_API_SECRET=process.env.CUBEJS_API_SECRET;
// redis
const app = express();
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

// models
const User = require('./models/user');
const Payment = require('./models/payment');

app.use(require('cors')());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.CUBEJS_API_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new BasicStrategy(
    (user, password, done) => {
      if (user === 'admin' && password === 'admin') {
        done(null, { user });
      } else {
        done(null, false);
      }
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.post('/login/registration', async (req, res) => {
  if (!req.body.login || !req.body.password) {
    res.status(400).send('Empty login or password!');
  }
  let user = await User.findOne({
    where: {username: req.body.login},
  });
  if (user) {
    return res.status(200).send('The user already exists!');
  }
  // find login
  try {
    let result = User.create({
      id: null,
      username: req.body.login,
      password: req.body.password,
      user_type: 'NORMAL',
    });
    return res.status(201).send('User created!');
  } catch (e) {
    return res.status(500).send('Error:(');
  }
});

app.post('/login/sign', async (req, res) => {
  if (!req.body.login || !req.body.password) {
    res.status(400).send('Empty login or password!');
  }
  let user = await User.findOne({
    where: {username: req.body.login},
  });
  if (user) {
    if (user.password === req.body.password) {
      let obj = {
        id: user.id,
        user_type: user.user_type,
        user_name: user.username,
        token: jwt.sign({}, user.user_type, { expiresIn: '30d' })
      };
      return res.status(200).send(obj);
    } else {
      return res.status(400).send('Incorrect login or password');
    }
  } else {
    return res.status(400).send('Failed to log in');
  }
});

app.post('/payments/add', async (req, res) => {
  try {
    let result = Payment.create({
      user_id: req.body.id,
      username: req.body.user_name,
      date: req.body.date,
      cost: req.body.cost,
      description: req.body.description,
      segment: req.body.segment,
      profit: req.body.profit
    });
    return res.status(201).send('Payment created!');
  } catch (e) {
    return res.status(500).send('Error:(');
  }
});


app.use((req, res, next) => {
  // if (!req.headers.authorization) {
  //   res.redirect('/login');
  //   return;
  // }
  // console.log(req.headers.authorization);
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic(path.join(__dirname, 'client/dist')));
}

const serverCore = CubejsServerCore.create({
  checkAuth: (req, auth) => {
    if (!req.headers.authorization) {
      throw new Error(`Unauthorized`);
    }
    req.authInfo = { u: req.user };
  }
});

serverCore.initApp(app);

const port = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.error('Fatal error during server start: ');
    console.error(e.stack || e);
  }
  console.log(`🚀 Cube.js server is listening on ${port}`);
});
