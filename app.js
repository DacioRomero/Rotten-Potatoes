// app.js
const express        = require('express');
const exphbs         = require('express-handlebars');
const methodOverride = require('method-override')
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser')

const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

reviews = require("./controllers/reviews")
reviews(app)

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
});
