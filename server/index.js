const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
const Ad = require('./models/ad');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
// const bcrypt = require('bcrypt');
const session = require('express-session');
const sessionOptions = {secret: 'Pejman-MERN-Wonderland', resave: false, saveUninitialized: false};
const ExpressError = require('./utils/ExpressError');
const catchAsync = require('./utils/catchAsync');
const {adSchema} = require('./schemas.js');

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
app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash("success");
    next();
})

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

const validateAd = (req, res, next) => {
    const {error} = adSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
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
    req.flash('success', 'Successfully registered!');
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
        req.flash('success', 'Successfully logged-in!');
        res.redirect('./secret');
    } else {
        res.redirect('/login');
    }
}))

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    req.flash('success', 'Successfully logged-out!');
    res.redirect('/login');
})
// Ad route-handlers:
app.get('/ads', catchAsync(async (req, res) => {
    const ads = await Ad.find({});
    res.render('ads/index', {ads});
}))

app.get('/ads/new', (req, res) => {
    res.render('ads/new');
})

app.post('/ads', validateAd, catchAsync(async(req, res) => {
    // if (!req.body.ad) throw new ExpressError('Invalid Ad Data', 400);
    const ad = new Ad(req.body.ad);
    await ad.save();
    req.flash('success', 'Successfully made new Ad!');
    res.redirect(`/ads/${ad._id}`);
}))

app.get('/ads/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    const ad = await Ad.findById(id);
    if (!ad) {
        throw new ExpressError('Ad not found!', 404);
    }
    res.render('ads/show', {ad});
}))

app.get('/ads/:id/edit', catchAsync(async(req, res) => {
    const id = req.params.id;
    const ad = await Ad.findById(id);
    if (!ad) {
        throw new ExpressError('Ad not found!', 404);
    }
    res.render('ads/edit', {ad});
}))

app.put('/ads/:id', validateAd, catchAsync(async(req, res) => {
    const {id} = req.params;
    const ad = await Ad.findByIdAndUpdate(id, {...req.body.ad}, {runValidators: true, new: true});
    req.flash('success', 'Ad successfully edited!');
    res.redirect(`/ads/${ad._id}`);
}))

app.delete('/ads/:id', catchAsync(async (req, res) => {
    const {id} = req.params;
    await Ad.findByIdAndDelete(id);
    req.flash('success', 'Ad successfully deleted!');
    res.redirect('/ads');
}))

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