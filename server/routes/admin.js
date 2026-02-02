const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send("SORRY NOT AN ADMIN!");
}) // Everything below this middleware, in
// this file (routes/ads.js) will NOT execute
// for no-admin users :)