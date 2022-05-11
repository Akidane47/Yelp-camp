const express = require('express');
const router = express.Router({mergeParams: true});
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/reviews');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))


// method to delete reviews, refresh page and display updated info
router.delete('/:reviewId', isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;