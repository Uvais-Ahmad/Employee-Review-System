const User = require('../models/users');
const Review = require('../models/review');

module.exports.login = function( req , res ){
    res.render('_login',{
        title : 'Log In'
    });
}

module.exports.register = function( req , res ){
    res.render('_register',{
        title : 'Registeration'
    })
}

module.exports.create = async function(req , res ){
    // console.log('Req body : ', req.body);
    let data = req.body;

    //Pass must be equal
    if( data.password != data.confirm_password){
        return res.redirect('back');
    }
    //check user is Already Registered or not
    let user = await User.findOne({email:data.email});

    // If this is new user
    if(!user){
        User.create( data , function( err , user ){
            if(err){console.log('Error occur while creating user : ',err); return;}
            console.log("User Created : ",user);
            
        });
        return res.render('_login',{
            title : 'Log In'
        })
    }
    //if its existing  user
    else{
        return res.render('_login',{
            title : 'Log In'
        })
    }
}

module.exports.createSession = function( req , res ){
    console.log('session created');
    
    // if logged In user is admin or Employee    
    return res.redirect('/');
    
}


module.exports.destroySession = function( req , res ){
    req.logout(function(err){
        if(err){
            console.log('Erro Occur while logout ',err);
        }
        return res.redirect('/user/login');
    })
}


module.exports.employee = function( req , res ){
    return res.redirect('/');
}

module.exports.admin = function( req ,res ){
    return res.redirect('/');
}

module.exports.addingReview = async function( req , res ){
    // here we add user review to that userr which is _id is req.body.empId
    try{
        let emp = await User.findById(req.body.empId).populate('review');
        console.log("FRom adding review ")
        let empReview = emp.review;
        // if that user have already review file
        if(empReview){
           console.log("if state : ")
            //add review in database
            let obj = {'reviewBy':req.user.name , 'review': req.body.review};
            await emp.review.from.push(obj);
            await emp.save();
            console.log("Emp from if ",emp.review.from);

        }
        // if user not have review file
        else{
            // first create empty review file
            console.log('ELse ')
            let empRev = await Review.create(null);
            let obj = {'reviewBy':req.user.name , 'review': req.body.review};
            //now add review whoch is given by other
            (await empRev).from.push(obj);
            await empRev.save();
            console.log('Emprev : ',empRev);
            // and set create review file to the user which not have review file
            emp.review = empRev._id;
            await emp.save();
            console.log("emp after getting review : ",emp.review);
        }
        // Now after adding review to other user , our task is remove the user from "to" of loggedIn user
        let crntReview = await Review.findById(req.body.currentReview);
        await crntReview.to.pop();
        await crntReview.save();
    }
    catch(err){
        console.log('Error while adding reiew on db : ',err);
    }
    return res.redirect('back');
}