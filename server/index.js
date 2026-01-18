const express = require('express');
const app = express();
const User = require('./models/user');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

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
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Home Page of Pejman-MERN-Wonderland!');
})

app.listen(3000, () => {
    console.log("SERVING YOUR APP! - 3000")
})