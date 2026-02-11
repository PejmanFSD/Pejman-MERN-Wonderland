const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user'); // Will be removed later
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
// const bcrypt = require('bcrypt');
const sessionConfig = {
    name: 'session',
    secret: 'Pejman-MERN-Wonderland',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Expiring the cookie in a week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
const {isLoggedIn} = require('./middleware.js');
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const userRoutes = require('./routes/users.js');
const adRoutes = require('./routes/ads.js');

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
app.use(express.urlencoded({ extended: true })); // For parcing the request
app.use(methodOverride('_method'));
app.use(session(sessionConfig));
app.use(flash());
app.use((req, res, next) => {
    // We have access to all the following variables in ALL the files of our
    // application (including the files of the client side)
    res.locals.currentUser = req.session.user_id;
    res.locals.success = req.flash("success"); // Most of the time it's empty!
    res.locals.error = req.flash("error"); // Most of the time it's empty!
    next();
})
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
app.use('/', userRoutes);
app.use('/ads', adRoutes);

app.use(express.static(path.join(__dirname, 'public')));

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/users', isLoggedIn, catchAsync(async (req, res) => {
    const users = await User.find({});
    res.render('users/index', {users});
}))

app.get('/users/:id', isLoggedIn, catchAsync(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.render('users/show', {user});
}))

app.get('/secret', requireLogin, (req, res) => {
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

app.listen(3000, () => {
    console.log("SERVING YOUR APP! - 3000");
})