const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 5000;

const passportApp = require('passport');
const passport = require('./passport')(passportApp);

app.use(passport.initialize());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const appRoutes = require('./routes/appRoutes')(express, passport, jwt);
const spyRoutes = require('./routes/spyRoutes')(express);

app.use('/',appRoutes);
app.use('/',spyRoutes);

app.listen(PORT);