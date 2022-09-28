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

  //@route GET api/SPEED
  router.post('/Login', async (req, res) => {
    await mongoose.find({
        user: req.body.user,
        pass: req.body.pass
    }, function (err, ress) {
       
        if (err) {
            res.send('Wrong User or Pass')
        }
        else {

            res.send('Login Successful')
        }

    }
    )
})

  module.exports = router;