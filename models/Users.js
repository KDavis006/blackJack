const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
 FirstName: {
  type: String,
  required:[true, 'Must provide Firstname'],
  trim:true,
 },
 LastName:{
  type: String,
    required:[true, 'Must provide Lastname'],
    trim:true,
 },
 Email: {
  type: String,
  required:[true, 'Must provide email'],
  unique:true,
  trim:true,
 },
 Username: {
  type: String,
  required:[true, 'Must provide username'],
  unique:true,
  trim:true,
 },
 Password: {
  type: String,
  required:[true, 'Must provide password'],
  trim:true,
 },
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
 age:{
  type:Number,
  default:5
 },
 id:{
  type:Number,
 }
},{collection: "Users"})



module.exports = mongoose.model('Users', userSchema)