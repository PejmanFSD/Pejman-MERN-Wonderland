const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
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
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const ads = require('./routes/ads.js');

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
    res.locals.success = req.flash("success"); // Most of the time it's empty!
    res.locals.error = req.flash("error"); // Most of the time it's empty!
    next();
})
app.use('/ads', ads);
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

app.get('/register', (req, res) => {
    res.render('Register');
})

app.post('/register', catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    // req.flash('success', 'Successfully registered!');
    res.redirect('/');
}))

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        // req.flash('success', 'Successfully logged-in!');
        res.redirect('./secret');
    } else {
        res.redirect('/login');
    }
}))

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.flash('success', 'Successfully logged-out!');
    res.redirect('/login');
})

app.get('/users', catchAsync(async (req, res) => {
    const users = await User.find({});
    res.render('users/index', {users});
}))

app.get('/users/:id', catchAsync(async (req, res) => {
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