var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Receipe = require('../models/Receipe.js');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

/* GET ALL RECEIPES */
router.get('/', function(req, res, next) {
    Receipe.find(function (err, receipe) {
      if (err) return next(err);
      res.json(receipe);
    });
  });
  
/* GET SINGLE RECEIPE BY ID */
router.get('/:id', function(req, res, next){
  Receipe.findById(req.params.id, function(err, post) {
    if(err) return next(err);
    res.json(post);
  });
});

/* SEARCH RECIEPES BY NAME */
router.get('/query/:name', function(req, res, next){
  console.log(new RegExp(req.params.name, "i"));
  Receipe.find({name: new RegExp(req.params.name, "i") }, function(err,post) {
    if(err) return next(err);
    res.json(post);
  });
});
 
/* SAVE RECEIPE */
router.post('/', function(req, res, next) {
    Receipe.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* UPDATE RECEIPE */
  router.put('/:id', function(req, res, next){
    Receipe.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      if(err) return next(err);
      res.json(post);
    });
  });

  /* DELETE RECEIPE */
router.delete('/:id', function(req, res, next) {
  Receipe.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

  module.exports = router;