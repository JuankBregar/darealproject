const passport = require('passport');

exports.singup = (req, res, next) => {
    const data = {
        labels: [
            { name: 'inicio', url: '/' },
            { name: 'usuarios', url: '/users' },
            { name: 'crear' }
        ],
        csrf: req.csrfToken(),
        errors: req.flash('error')
    }
    res.render('users/singup', data);
}

exports.register = passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/users/singup',
    failureFlash: true
});

exports.login = (req, res, next) => {
    const data = {
        layout: false,
        csrf: req.csrfToken(),
        error: req.flash('error')
    };
    res.render('users/login', data);
}

exports.loggingin = passport.authenticate('local.signin', {
    successRedirect: '/products',
    failureRedirect: '/users/login',
    failureFlash: true
});

exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/users/login');
}