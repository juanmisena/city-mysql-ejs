// packages
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const myConnection = require('express-myconnection');
const morgan = require('morgan');
const session = require('express-session');
// using express
const app = express();
// importing routes and session
const routeRoutes = require('./routes/route');
// settings
require('dotenv').config({path: './src/.env'});
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// config database
const dbOptions = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
   database: process.env.DB_DATABASE
}
// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(session({resave: false, saveUninitialized: false, secret: 'secret'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routeRoutes);
// static files
app.use('/public',express.static(path.join(__dirname, 'public')));
// listenning out port
app.listen(port , ()=> console.log('> Server is up and running on port : ' + port));