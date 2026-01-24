const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
const Ad = require('./models/ad');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');
const session = require('express-session');
const AppError = require('./AppError');

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
app.use(session({ secret: 'Pejman-MERN-Wonderland' }));

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

app.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        req.session.user_id = user._id;
        res.redirect('/');
    } catch (err) {
        next(err);
    }
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const foundUser = await User.findAndValidate(username, password);
        if (foundUser) {
            req.session.user_id = foundUser._id;
            res.redirect('./secret');
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        next(err);
    }
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/ads', async (req, res, next) => {
    try {
        const ads = await Ad.find({});
        res.render('ads/index', {ads});
    } catch (err) {
        next(err);
    }
})

app.get('/ads/new', (req, res) => {
    res.render('ads/new');
})

app.post('/ads', async(req, res, next) => {
    try {
        const ad = new Ad(req.body.ad);
        await ad.save();
        res.redirect(`/ads/${ad._id}`);
    } catch(err) {
        next(err);
    }
})

app.get('/ads/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const ad = await Ad.findById(id);
        if (!ad) {
            throw new AppError('Ad not found!', 404);
        }
        res.render('ads/show', {ad});
    } catch(err) {
        next(err);
    }
})

app.get('/ads/:id/edit', async(req, res, next) => {
    try {
        const id = req.params.id;
        const ad = await Ad.findById(id);
        if (!ad) {
            throw new AppError('Ad not found!', 404);
        }
        res.render('ads/edit', {ad});
    } catch(err) {
        next(err);
    }
})

app.put('/ads/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const ad = await Ad.findByIdAndUpdate(id, {...req.body.ad}, {runValidators: true, new: true});
        res.redirect(`/ads/${ad._id}`);
    } catch(err) {
        next(err);
    }
})

app.delete('/ads/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        await Ad.findByIdAndDelete(id);
        res.redirect('/ads');
    } catch (err) {
        next(err);
    }
})

app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.render('users/index', {users});
    } catch (err) {
        next(err);
    }
})

app.get('/users/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.render('users/show', {user});
    } catch (err) {
        next(err);
    }
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})
// If an error is caught, the "next" attribute
// sends it to the following middleware:
app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("SERVING YOUR APP! - 3000");
})