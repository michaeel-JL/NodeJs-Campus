const express = require('express');
const router = express.Router();
const User = require('../models/user');



// router.get('/verUsuarios', async (req, res) => {
//     const pruebas = await usuario.find({'usuario':req.pruebas.nombre});
//     res.render('verUsuarios', {
//       pruebas
//     });
//   });

router.get('/verUsuarios', (req, res, next) => {
  res.render('verUsuarios');
})

router.get('/verUsuarios', async (req, res, next) => {
    const users = await User.find({'user': req.user});
    console.log("bieeeeeeeeen");
res.render('user', {
  users
});
})


  module.exports = router;