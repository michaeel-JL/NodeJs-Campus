const express = require('express');
const router = express.Router();
const User = require('../models/user');
  
  router.get('/verAlumnos', async (req, res) => {
      const users = await User.find();
  res.render('verAlumnos', {
    users
  });
  })
  
  
    module.exports = router;