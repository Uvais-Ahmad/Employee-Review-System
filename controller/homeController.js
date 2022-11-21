const Review = require('../models/review');
const User = require('../models/users');

module.exports.home = async function(req , res ){

    // still not login
    if(!req.user){
        
        return res.redirect('/user/login');
    }
    else{

        let revRequest=null;
        let listReview = null;
        // find the review correspod to the logIn user
        let revId = await req.user.review;
        //if any review have, it shown
        if(revId){
            //find review file which assigned to the user
            let review = await Review.findById(revId);
            // Not have any value for requested review
            if(review.to.length != 0){
                // we assign the last item
                revRequest = await review.to[review.to.length-1];

                //populate the requested user to review
                revRequest = await User.findById(revRequest.toReview);
            }   
            // list Of reivewd given by other
            if(review.from.length != 0){
                listReview = review.from;
                console.log('List reviwe ',review);
            }
            
            // render here
            return res.render('_home',{
                title : 'Home',
                revRequest,
                review,
                listReview
            })

        }
        // if review file not exit then we return revRequested null
        else{
            return res.render('_home',{
                title : 'Home',
                revRequest,
                listReview
            })
        }
    }
    
}