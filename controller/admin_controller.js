module.exports.assignWork = function( req , res ){

    if(req.user.isAdmin){
        return res.render('_assignWork',{
            title : "Assign Work"
        });
    }
    else{
        return res.redirect('/');
    }

    
}

module.exports.allEmployee = function( req , res ){

    if(req.user.isAdmin){
        return res.render('_allEmployee',{
            title : "Employees"
        });
    }
    else{
        return res.redirect('/');
    }
}