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

router.get('/status', (req, res) => {
  const status = req.query.status;
  var condition = { status: { $regex: new RegExp(status), $options: "i" } };
  Article.find(condition)

    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: "Database error!" }))
})

router.put('/updateStatus/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }
  const id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Article with id=${id}. Maybe Article was not found!`
        });
      } else res.send({ message: "Article was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Article with id=" + id
      });
    });
})

router.get('/submit', (req, res) => {
  Article.create({
    title: req.query.title,
    description: req.query.description,
    published_date: req.query.published_date,
    publisher: req.query.publisher,
    email: req.query.email,
    status: 'PENDING_REVIEW',
  })
    .then((response) => res.status(200).json({ isSuccessful: true }))
    .catch((err) => res.status(400).json({ error: "Database error!" + err }));
});

router.get('/search', (req, res) => {
  let title = req.query.title;
  // let author = req.query.author;
  // let description = req.query.description;
  // let published_date = req.query.published_date;
  // let publisher = req.query.publisher;

  Article.find({
    "title": {
      "$regex": title,
      "$options": "i"
    },
    "status": "Approved_By_Analyst"
  })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: "Database error!" }))
})

module.exports = router;