// REQUIREMENTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');
var exphbs = require('express-handlebars');

// EXPRESS APP
const app = express();

// REVIEW MONGODB MODEL
const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  rating: Number,
  description: String,
});

// CONFIGURATION
var hbs = exphbs.create({extname: '.handlebars'});
app.engine(hbs.extname, exphbs({defaultLayout: 'main'}));
app.set('view engine', hbs.extname);
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true});

// HANDLEBARS HELPERS
Handlebars.registerHelper("select", function(value, options) {
  return options.fn(this)
    .split('\n')
    .map(function(v) {
      var t = 'value="' + value + '"'
      return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// IMPORT OUR ROUTES
var routes = require('./controllers/reviews');
routes(app, Review);

// CONSOLE
app.listen(rocess.env.PORT || 3000, () => {
  console.log('App listening on port 3000!')
});
