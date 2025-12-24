const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Import route handlers for admin and shop sections
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Catch-all middleware for handling 404 errors
// This must be placed after all route handlers because Express executes middleware in order
// If a request doesn't match any of the routes above, it will reach this middleware
// which responds with a 404 status and renders the 404 error page
app.use(errorController.get404);

app.listen(3000);
