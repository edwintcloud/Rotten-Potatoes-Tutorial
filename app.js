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

// IMPORT MONGODB MODELS
const Review = require('./models/review')
const Comment = require('./models/comment')

// CONFIGURATION
var hbs = exphbs.create({
    extname: '.handlebars'
});
app.engine(hbs.extname, exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', hbs.extname);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {
    useNewUrlParser: true
});

// HANDLEBARS HELPERS
Handlebars.registerHelper("select", function(value, options) {
    return options.fn(this)
        .split('\n')
        .map(function(v) {
            var t = 'value="' + value + '"'
            return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
        })
        .join('\n')
});

Handlebars.registerHelper("stars", function(items) {
    var html = "";
    for (i = 0; i < 5; i++) {
        if (i < Number(items)) {
            html += "<span class='fa fa-star checked'></span>";
        } else {
            html += "<span class='fa fa-star'></span>";
        }
    }
    return new Handlebars.SafeString(html);
});

Handlebars.registerHelper("slice8", function (context) {
    var result = '' + context;
    return result.slice(-8);
});

Handlebars.registerHelper("prettyDate", function (c) {
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var dd = (c.getDate()<10 ? "0" + c.getDate() : c.getDate());
    var month = months[c.getMonth()];
    var yyyy = c.getFullYear();
    var hh = c.getHours();
    var mm = (c.getMinutes()<10 ? "0" + c.getMinutes() : c.getMinutes());
    var ss = (c.getSeconds()<10 ? "0" + c.getSeconds() : c.getSeconds());
    var mod = (hh>12 ? "PM" : "AM");
    hh = (hh>12 ? hh-12 : hh)

    return (month + ' ' + dd + ', ' + yyyy + ' ' + hh + ':' + mm + ':' + ss + ' ' + mod);
});

Handlebars.registerHelper("reverse", function(a) {
    a.reverse();
});

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// IMPORT OUR ROUTES
var reviews = require('./controllers/reviews');
var comments = require('./controllers/comments');
var movies = require('./controllers/movies');
var admin = require('./controllers/admin');
reviews(app, Review, Comment);
comments(app, Comment);
movies(app, Review);
admin(app, Review);

// CONSOLE
app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
});
