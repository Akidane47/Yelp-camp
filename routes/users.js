const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const users = require('../controllers/users');

router.get('/logout', users.logout);

router.route('/register')
    .get(users.renderUser)
    .post(catchAsync(users.registerUser))


router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)






module.exports = router;