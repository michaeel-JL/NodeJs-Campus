const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Subject = require('../models/subject');

router.get('/verAsignaturas', (req, res, next) => {
    res.render('verAsignaturas');
  })
  
  // router.get('/verAsignaturas', async (req, res, next) => {
  //     const users = await User.find({'user': req.user});
  //     console.log("bieeeeeeeeen");
  // res.render('user', {
  //   users
  // });
  // })

  router.post('/verAsignaturas/add',(req, res) => {
    const subject = new Subject(req.body);

    // if(req.user.)
    // subject.usuario=req.user._id;
    subject.save();
    res.redirect('/verAsignaturas');
  });
  
  
    module.exports = router;