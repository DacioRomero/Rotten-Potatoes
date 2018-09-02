// app.js
const express        = require('express');
const exphbs         = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser')

const app = express();

const Review = require('./models/review')
const reviewsController = require("./controllers/reviews")
const Comment = require('./models/comment')
const commentsController = require('./controllers/comments')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

reviewsController(app)
reviewsController(app)

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port ' + port + '!');
});
