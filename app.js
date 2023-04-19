require('dotenv').config()
const express = require("express");
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const homedir = require("./controllers/homedir");
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const port = process.env.PORT || 3001;
// const DB_HOST = process.env.ztm_sbdb_host;
// const DB_PORT = process.env.ztm_sbdb_port;
// const DB_USER = process.env.ztm_sbdb_user;
// const DB_PW = process.env.ztm_sbdb_pw;
// const DB_NAME = process.env.ztm_sbdb;

// const db = require('knex')({
//   client: 'pg',
//   connection: {
//       host : DB_HOST,
//       port : DB_PORT,
//       user: DB_USER,
//       password : DB_PW,
//       database : DB_NAME
//   }
//   //searchPath: ['knex', 'public'],
// });
const db = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Setting up the public directory
app.use(express.static('public'));

function getUser(id) {
  let found = false;
  db.users.forEach(user => {
      if (user.id === id) {
          found = true;
          return res.status(200).json(user);
      }
  })
  if (!found) {
      res.status(400).json('not found');
  }
}

app.get("/", (req, res) => res.status(200).sendFile(path.join(__dirname, '/public/index.html')));
// app.get("/", (req, res) => { homedir.handleHomeConnection(req, res, db, bcrypt) }); // connect to DB & check for (or create) required tables

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) // dependency injuection;
// app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/signin', signIn.handleSignIn(db, bcrypt) )
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleIMG(req, res, db) })
app.post('/imageURL', (req, res) => { image.handleAPICall(req, res) })

app.listen(port, () => console.log(`App listening on port ${port}!`));
