module.exports.login = function( req , res ){
    res.render('login',{
        title : 'Log In'
    });
}

module.exports.register = function( req , res ){
    res.render('register',{
        title : 'Registeration'
    })
}