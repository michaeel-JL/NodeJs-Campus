const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Subject = require('../models/subject');


router.get('/verInfoAsignaturas', (req, res, next) => {
    res.render('verInfoAsignaturas');
  })




  module.exports = router;