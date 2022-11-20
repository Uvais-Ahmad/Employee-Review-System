const User = require('../models/users');
const Review = require('../models/review');

//  It render the page of assignWork
module.exports.assignWork = function( req , res ){

    // find all employees
    User.find({} , function(err , users){
        if(err){ console.log('Error occur while finding employes');}

        //check if user is ADMIN
        if(req.user.isAdmin){
            return res.render('_assignWork',{
                title : "Assign Work",
                users : users
            });
        }
        else{
            return res.redirect('/');
        }
    });    
}

// It render the page of AllEmployee
module.exports.allEmployee = function( req , res ){

    User.find( {} , function(err , users ){
        if(err){ console.log('Error occur while finding employes');}

        if(req.user.isAdmin){
            return res.render('_allEmployee',{
                title : "Employees",
                users : users
            });
        }
        else{
            return res.redirect('/');
        }
    })
}

        // Assign the employee to take review
module.exports.handleCreateReview = async function( req , res ){

    try{

        if(req.user.isAdmin){
            console.log("REQ body : ",req.body)
            //find receipent
            let rcptUser = await User.findById(req.body.receipent);
            //Review is not avail in finded receipent
            if( !rcptUser.review ){
                // create review file with null
                let review = await Review.create(null);
                let obj = { 'toReview':req.body.receiver};
                console.log('review : ',review);

                // add receiver id here to assign reveiw
                (await review).to.push(obj);
                // after push save it
                review.save();

                // add review id in User schema
                rcptUser.review = (await review)._id;
                rcptUser.save();
                console.log('Review : ',review);
                console.log('rcptUser : ',rcptUser);
            }
            //if not
                // 1 create review 
                // 2 add id of reveiver in "to"
                // 3 add review id in recepent user review section
                // then save receipent
            else{
                // let review = rcptUser.review;
                review = await Review.findById(rcptUser.review)
                let obj = { 'toReview':req.body.receiver};
                await review.to.push(obj);
                review.save();
                console.log("else revieew" , review);
            }
        }
    }
    catch(err){
        console.log('Error occur while add assignment ',err);
    }
     

    // add receiver id in toreview

    
    return res.redirect('back');
}

        //  to add employee as a admin 
module.exports.addToAdmin = function( req , res ){
    console.log('handle add to admin : ',req.body);
    let id = req.body.empAsAdminName;
    // let updatedUser = await User.findByIdAndUpdate({id:id} , {isAdmin : "true"});
    User.findByIdAndUpdate(id , { isAdmin : 'true'} , function( err , user ){
        if(err){ console.log('Error occur while updating'); }

        console.log('User : ',user);
        return res.redirect('back');
    })
    
}


        // to remove employee as a admin
module.exports.removeFromAdmin = function( req , res ){

    console.log('handle add to admin : ',req.params);
    let id = req.params.id;
    console.log('id : ',id);
    User.findByIdAndUpdate(id , { isAdmin : 'false'} , function( err , user ){
        if(err){ console.log('Error occur while updating'); return; }

        console.log('User : ',user);
        return res.redirect('back');
    })
    
}

module.exports.removeEmp = function( req , res ){
    console.log('handle remove Emp with id : ',req.params.id);
    let id = req.params.id;
    User.findByIdAndRemove(id , function( err , user ){
        if(err){ console.log('Error occur while updating'); return; }

        console.log('User deleted : ',user);
        return res.redirect('back');
    })
}