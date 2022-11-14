module.exports.home = function(req , res ){

    if(!req.user){
        return res.redirect('/user/login');
    }
    else{
        return res.render('_home',{
            title : 'Home'
        })
    }
    
}