const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports=function(passport){
 passport.use(
  // 'SELECT * FROM users WHERE username = ?', [ username], function (err, row)
  new localStrategy({usernameField : 'email', passwordField: 'password'},(email,password,done)=>{
  // match user
  User.findOne({email : email})
  .then((user)=>{
   if(!user){
    return done(null,false,{message : 'That email is not registered'});
   }
   // match pass
   bcrypt.compare(password,user.password,(err,isMatch)=>{
    if(err) throw err
    if(isMatch){
     return done(null,user);
    }else{
     return done(null,false,{message : 'Incorrect password'});
    }
   })
  })
  .catch((err)=>{
   return done(null,false,{message :'password is incorrect'});
  });
 })
 )


 passport.serializeUser((user,done)=>{
  done(null,user.id);
 })

 passport.deserializeUser((id,done)=>{
  User.findById(id).then((user,err)=>{
   if(err) {
    console.log(err);
    done(err);
   }
   done(err,user);
  }).catch((err)=>{console.log(err)});
 })
}

// this js file validates the users credentials and if they are valid, it passes the user to the next function. this uses a local strategy to do varification instead of outside sources like google.

// serializeUser takes in the user and makes a session id for them and then adds .user to any request they make and when they log out it removes the session id from the user object and gets rid of the user addition to the requests from the session.