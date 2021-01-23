const express = require('express');
const router = express.Router();
const User = require('../models/user');



router.get('/verProfesores', async (req, res) => {
    const users = await User.find();
  res.render('verProfesores', {
      users
  });
})
  module.exports = router;