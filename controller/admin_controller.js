const User = require('../models/users');

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


module.exports.handleAssignWork = function( req , res ){
    console.log('Handle assign worl : ',req.body);

    if(req.user.isAdmin){}
    return res.redirect('back');
}


module.exports.addToAdmin = function( req , res ){
    console.log('handle add to admin : ',req.body);
    return res.redirect('back');
}