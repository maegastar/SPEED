//need to figure out api's

const express = require('express');
const router = express.Router();

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

  module.exports = router;