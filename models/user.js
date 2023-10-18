const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  first_name :{
  type  : String,
  required : true
 } ,
 last_name :{
  type  : String,
  required : true
 } ,
 email :{
  type  : String,
  required : true
 } ,
 password :{
  type  : String,
  required : true
 } ,
 Wins: {
  type: Number,
  default: 0,
 },
 Losses: {
  type: Number,
  default: 0,
 },
 Ties: {
  type: Number,
  default: 0,
 },
 MaxWinStreak: {
  type: Number,
  default: 0,
 },
 MaxLoseStreak: {
  type: Number,
    default: 0,
   }, 
  winStreakValue: {
    type: Number,
    default: 0,
  },
  loseStreakValue: {
    type: Number,
    default: 0,
  }
},{collection: "Users"})


const User = mongoose.model('User', UserSchema)

module.exports = User