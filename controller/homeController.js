const Review = require('../models/review');
const User = require('../models/users');

module.exports.home = async function(req , res ){

    // still not login
    if(!req.user){
        
        return res.redirect('/user/login');
    }
    else{

        let revRequest=null;
        // find the review correspod to the logIn user
        let revId = await req.user.review;
        //if any review have, it shown
        if(revId){
            //find review file which assigned to the user
            let review = await Review.findById(revId);
            revRequest = await review.to[0];

            //populate the requested user to review
            revRequest = await User.findById(revRequest.toReview);
            // render here
            return res.render('_home',{
                title : 'Home',
                revRequest
            })

        }
        // if review file not exit then we return revRequested null
        else{
            return res.render('_home',{
                title : 'Home',
                revRequest
            })
        }
    }
    
}