//need to figure out api's

const { LogTimings } = require('concurrently');
const express = require('express');
const router = express.Router();

const Login = require("../../models/Login");

//load database model - as articles? could change later if needed
const Article = require('../../models/Article');

//@route GET api/speed/test
//tests speed route
router.get('/test', (req, res) => res.send('speed route testing'));

// @route GET api/speed
// @description Get all articles
router.get('/', (req, res) => {
    Article.find()
      .then(speed => res.json(speed))
      .catch(err => res.status(404).json({ noarticlefound: 'No Articles found' }));
  });

  //@route POST api/SPEED/mod
  router.post('/mod', (req, res) => {
    Login.create(req.body)
      .then((user) => res.json({ msg: "User added successfully" }))
      .catch((err) => res.status(400).json({ error: "Unable to add this user" }));
  });

  //@route GET api/SPEED/mod
  router.get('/mod', (req, res) => {
    Login.find()
      .then(user => res.json(user))
      .catch((err) => res.status(400).json({ error: "Unable to find this user" }));
  });

  module.exports = router;