//Dependencies
const passport = require('passport');
const User = require('../models/user');
const Strategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

//How to store user
passport.serializeUser((user, done) => {
    done(null, user.id);
})

//How to read the user
passport.deserializeUser((id, done) => {
    User.findById(id).exec()
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err);
        })
});

//Define local Strategy to create users
passport.use('local.signup', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    //Validate fields
    req.checkBody('email', 'La dirección de correo no es valida').notEmpty().isEmail();
    req.checkBody('password', 'La contraseña es invalida').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/, "i");
    let errors = req.validationErrors() ? req.validationErrors().map(val => { return val.msg }) : [];
    if (errors.length > 0) return done(null, false, req.flash('error', errors));
    //Chek if user already exits
    User.findOne({ email: email }).exec()
        .then(user => {
            if (user) {
                return done(null, false, { message: 'El correo ya esta registrado' });
            }
            let newUser = new User();
            newUser._id = mongoose.Types.ObjectId();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save()
                .then(newUser => {
                    return done(null, newUser);
                })
                .catch(err => {
                    return done(err);
                })

        })
        .catch(err => {
            return done(err);
        })
}));

//Define local strategy to sing in users
passport.use('local.signin', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    //Validate fields
    req.checkBody('email', 'Correo invalido').notEmpty().isEmail();
    req.checkBody('password', 'Debe introducir una contraseña').notEmpty();
    let errors = req.validationErrors() ? req.validationErrors().map(val => { return val.msg }) : [];
    if (errors.length > 0) return done(null, false, req.flash('error', errors));
    //Check if user exists and password is correct
    User.findOne({ email: email }).exec()
        .then(user => {
            if (!user) {
                return done(null, false, { message: 'Correo no registrado' });
            }
            if (!user.validatePassword(password, user.password)) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }
            done(null, user);
        })
        .catch(err => {
            done(err);
        })
}));