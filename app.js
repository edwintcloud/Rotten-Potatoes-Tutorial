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
    'mongodb://localhost/rotten-potatoes' ||
    'mongodb://user:password1@ds137812.mlab.com:37812/heroku_fpwxpnv1'
var theport = process.env.PORT || 3000;

// EXPRESS APP
const app = express();

// IMPORT MONGODB MODELS
const Review = require('./models/review')
const Comment = require('./models/comment')

// CONFIGURATION
var hbs = exphbs.create({extname: '.handlebars'});
app.engine(hbs.extname, exphbs({defaultLayout: 'main'}));
app.set('view engine', hbs.extname);
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE CONNECTION
mongoose.connect(uristring, { useNewUrlParser: true }, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connecting to: ' + uristring);
      }
  });

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
var reviews = require('./controllers/reviews');
var comments = require('./controllers/comments');
reviews(app, Review, Comment);
comments(app, Comment);

// CONSOLE
app.listen(theport, () => {
  console.log('App listening on port 3000!')
});
