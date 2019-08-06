const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const url = 'mongodb://localhost:27017/demo';
const mongoose = require("mongoose");
const Schema  = require("schema");
// const MongoClient = require('mongodb').MongoClient
const cors = require("cors");
const assert = require('assert');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var auser=require('./schema').auser;
// var corsMiddleware = require('cors-middleware')
// var merry = require('merry')

// var bcrypt=require('bcrypt');

// var mw = merry.middleware
// app.use(corsMiddleware({
//   methods: 'GET',
//   origin: 'http://localhost:8080'
// }));
 
// var app1=merry()

// app.router('GET', '/', homeRoute)
 
function homeRoute (req, res, ctx) {
  console.log(res.getHeader('access-control-allow-origin')) // 'http://localhost:8080'
  ctx.send(200, { msg: 'woah cors headers are all set' })
}

// let DB;
var corsOptions = {
  origin: 'http://localhost:8100',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


mongoose.connect(url,{ useNewUrlParser: true });
 var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});


// MongoClient.connect(url, function(err, client) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   DB = client.db("resume");

// });


var auserSchema=mongoose.Schema({
    name: {type: String, require:true},
    emailid: {type:String, unique:true, require:true},
    password: {type: String, require:true},
    mobilenumber: {type: Number, min : 10, require:true},
    college : {type: String, require:true}
});
// auserSchema.statics.hashPassword=function(hashPassword(password)){
//   return bcrypt.hashSync(password,10);
// }
// auserSchema.methods.validPassword=function(hashedPassword){
//   return bcrypt.compareSync(hashedPassword,this.password);
// }
var auser = mongoose.model('auser', auserSchema);

app.use(express.static('public'));

var passport=require('passport');
var session=require('express-session');

app.use(session({
  name:'myname.sid',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    httpOnly:false,
    secure:false
  }
}));
passport.use('local',new LocalStrategy({
  usernameField:'emailid',
  passwordField:'password'
},
function(username, password, done) {
  auser.findOne({ emailid: username }, function(err, user) {
    console.log(err,user);
    if (err) { return done(err); }
    if (!user==user.user) {
      return done(null, false, { message: 'Incorrect Email ID.' });
    }
    if (!password==user.password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, auser);
  });
}
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  auser.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/signup',function(req,res){
   let a = req.body.name;
  console.log(a)
  if(req.body.name &&
    req.body.emailid &&
    req.body.password &&
    req.body.mobilenumber &&
    req.body.college
  ){
    var userData={
      name:req.body.name,
      emailid:req.body.emailid,
      password:req.body.password,
      mobilenumber:req.body.mobilenumber,
      college:req.body.college
    }
    console.log(userData)
    auser.create(userData,function(err,auser)
    {
      if(err){
        return next(err)
      }
      else {
        return res.redirect('/login');
      }
      
    });
  }
});
app.post('/login', function(req, res, next) {
  let  a = req.body.emailid
  console.log(a)
  passport.authenticate('local', function(err, auser, info) {
    if (err) { return res.json({"err":1}); }
    if (!auser) { return res.status({"err":2}); }
    req.logIn(auser, function(err) {
      if (err) { return res.json({"err":3}); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

app.listen(8080,function(){
  console.log("server started");
})