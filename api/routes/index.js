var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var Users = require('../models/users')

var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

//test
router.get('/test', function(req, res, next) {
    res.send("authentication API");
});

//check db :
router.get('/', function(req, res, next){
    console.log("get on all users");
    //console.log(Users)
    Users.find(function(err, users) {
        if(err) return next(err);
        res.json(users);
    });
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;