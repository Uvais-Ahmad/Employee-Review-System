const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    to : [{
        toReview : String
    }],
    from : [{
        reviewBy:String,
        review : String
    }]
});

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review;