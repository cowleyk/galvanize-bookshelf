'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
var knex = require('../knex');
var bcrypt = require('bcrypt');
const { camelizeKeys, decamelizeKeys } = require('humps');


// YOUR CODE HERE
router.post('/users', function(req,res,next){
  var hash = bcrypt.hashSync(req.body.password, 12);
  knex('users')
  .insert({
    first_name:req.body.firstName,
    last_name:req.body.lastName,
    email:req.body.email,
    hashed_password: hash
  }, '*')
  // .first()
  .then((rows) => {
    const users = camelizeKeys(rows[0]);
    delete users.hashedPassword;
    res.send(users);
  })
  .catch((err) => {
    next(err);
  });
});


module.exports = router;
