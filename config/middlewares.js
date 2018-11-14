exports.isLoggedin = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
}

exports.notLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}