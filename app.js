// REQUIREMENTS
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');
var exphbs = require('express-handlebars');
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/rotten-potatoes'
var theport = process.env.PORT || 3000;

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

// MONGOOSE CONNECTION
mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
  }, { useNewUrlParser: true });

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
app.listen(theport, () => {
  console.log('App listening on port 3000!')
});
