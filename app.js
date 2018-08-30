// VARIABLES AND CONSTANTS
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var exphbs = require('express-handlebars');


// REVIEW MONGODB MODEL
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

// CONFIGURATION
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true});

// INDEX ROUTE
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

// NEW REVIEW ROUTE
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review);
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

// CONSOLE
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
