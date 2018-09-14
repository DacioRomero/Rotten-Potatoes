#!/usr/bin/env node

// DEPENDENCIES
const express        = require('express');
const exphbs         = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const path           = require('path');

// MIDDLEWARE
const app = express();

app.engine('handlebars', exphbs({
    layoutsDir: path.join(__dirname, '/views/layouts/'),
    partialsDir: path.join(__dirname, '/views/partials/'),
    defaultLayout: 'main'
}));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

// DATABASE
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

// ROUTES
const moviesController = require('./controllers/movies');
const reviewsController = require("./controllers/reviews");
const commentsController = require('./controllers/comments');
const adminController = require('./controllers/admin');

moviesController(app);
reviewsController(app);
commentsController(app);
adminController(app);

// LISTENER - only if directly run
if (require.main === module) {
    let port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
    });
}

module.exports = app;
