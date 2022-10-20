//need to figure out api's

const { LogTimings } = require('concurrently');
const express = require('express');
const router = express.Router();

const Login = require("../../models/Login");

//load database model - as articles? could change later if needed
const Article = require('../../models/Article');

const Review = require('../../models/Review');

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
});

router.get('/changestatus', (req, res) => {
  const id = req.query.id;
  const status = req.query.status;

  Article.findByIdAndUpdate(id, { status }, { new: true })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: "Database error!" + err }));


});

router.get('/publish', (req, res) => {
  const id = req.query.id;
  const title = req.query.title;
  const author = req.query.author;
  const published_date = req.query.published_date;
  const publisher = req.query.publisher;
  const description = req.query.description;
  const status = "PUBLISHED";

  Article.findByIdAndUpdate(id, { title, author, published_date, publisher, description, status }, { new: true })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: "Database error!" + err }));
});

router.get('/submit', (req, res) => {
  Article.create({
    title: req.query.title,
    author: req.query.author,
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
  let keywords = req.query.keywords;

  Article.find(
    {
      $text: { $search: keywords },
      "status": "PUBLISHED"
    }
  )
    .select('title author description published_date publisher')
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: err }))
})

router.get('/getById', (req, res) => {
  Article.findById(req.query.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: err }));
})

router.get('/getReviews', (req, res) => {
  let article_id = req.query.id;
  Review.find({ article_id })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: err }));
})

router.get('/submitReview', (req, res) => {
  let article_id = req.query.article_id;
  let review = req.query.review;
  let email = req.query.email;

  Review.create({ article_id, review, email })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ error: err }));
})

module.exports = router;