const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// login page
router.get('/login', (req, res) => {
 res.render('pages/login');
})

// register page
router.get('/register', (req, res) => {
 res.render('pages/register');
})

// register handler
router.post('/register', (req, res) => {
 // gets all input fields
 const {first_name, last_name, email, password, password2} = req.body;
 let errors = [];
 // check if fields are empty
 if(!first_name ||!last_name ||!email ||!password ||!password2){
  errors.push({msg: 'Please fill in all fields'});
 }
 // check if passwords match
 if(password!== password2){
  errors.push({msg: 'Passwords do not match'});
 }

 // check if passwords are at least 6 characters long
 if(password.length < 6){
  errors.push({msg: 'Password must be at least 6 characters long'});
 }
 if(errors.length > 0){
  // push errors to req.flash
  res.render('pages/register', {
   errors: errors,
   first_name: first_name,
   last_name: last_name,
   email: email,
   password: password,
  })
  } else {

  // finds if email already exists
  User.findOne({email: email})
  .then((user, err) => {
   if (user) {
    errors.push({msg: 'Email already in use'});
    res.render('pages/register', {
      errors: errors,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      password2: password2
    })
  } else {
    // create new user
    const newUser = new User({
     first_name: first_name,
     last_name: last_name,
     email: email,
     password: password
    });
    // hash password and save to database
    bcrypt.genSalt(10, (err, salt) => {
     bcrypt.hash(newUser.password, salt, ((err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      // save user to database using mongoose
      newUser.save().then((value)=> {
       req.flash('success_msg', 'You are now registered!');
       res.redirect('/users/login');
      })
      .catch (value => console.log("value: yaaaay"));
     }))
    })
   }
  })
 }
})




// Login
router.post('/login', (req, res, next) => {
 passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/users/login',
  failureFlash: true
 })(req, res, next);
})

// Logout
router.get('pages/logout', (req, res) => {
 req.logout((err)=> {
  if (err) {
   return next(err);
  }
 });
 res.redirect('/');
})

module.exports = router;