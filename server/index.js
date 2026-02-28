if (process.env.NODE_ENV !== "production") { // When the project is deployed, it will be running in "production" environment
    // Before deploying, the project is running in "development" environment, so we need access to the ".env" file
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const {isLoggedIn} = require('./middleware.js');
const ExpressError = require('./utils/ExpressError');
const userAuthRoutes = require('./routes/usersAuth.js');
const userRoutes = require('./routes/users.js');
const adRoutes = require('./routes/ads.js');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/pejman-mern-wonderland')
    .then(() => {
        console.log("MONGODB CONNECTION OPEN!");
    })
    .catch(err => {
        console.log("MONGODB CONNECTION ERROR!");
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parcing the request
app.use(methodOverride('_method'));
app.use(session({
  secret: "mySecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,   // VERY IMPORTANT for localhost
    sameSite: "lax"
  }
}));
app.use(flash());
app.use((req, res, next) => {
    // We have access to all the following variables in ALL the files of our
    // application (including the files of the client side)
    res.locals.currentUser = req.session.user_id;
    res.locals.success = req.flash("success"); // Most of the time it's empty!
    res.locals.error = req.flash("error"); // Most of the time it's empty!
    next();
})
// For connecting to front-end:
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(async (req, res, next) => {
    if (req.session.user_id) {
        try {
            const user = await User.findById(req.session.user_id);
            if (user) {
                req.user = user;
                res.locals.currentUser = user;
            }
        } catch (e) {
            req.user = null;
        }
    }
    next();
});
app.use('/', userAuthRoutes);
app.use('/users', userRoutes);
app.use('/ads', adRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/secret', isLoggedIn, (req, res) => {
    res.render('secret');
})

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

// If an error is caught, the "next" attribute
// sends it to the following middleware:
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Somethignwent wrong!'
    res.status(statusCode).render('error', {err});
})

app.listen(process.env.PORT, () => {
    console.log("SERVING YOUR APP! - 4000");
})