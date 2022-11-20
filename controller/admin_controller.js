const User = require('../models/users');

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
module.exports.handleAssignWork = function( req , res ){
    console.log('Handle assign worl : ',req.body);

    if(req.user.isAdmin){}
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