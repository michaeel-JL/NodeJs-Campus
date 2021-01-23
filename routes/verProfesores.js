const express = require('express');
const router = express.Router();
const User = require('../models/user');



router.get('/verProfesores', async (req, res) => {
    const users = await User.find();
  res.render('verProfesores', {
      users
  });
})



  //Boton eliminar
  router.get('/verProfesores/delete/:id', async (req, res, next) => {
    let { id } = req.params;
    await User.remove({_id: id});
    res.redirect('/verProfesores');
  });


  
//Boton anadir
router.post('/verProfesores/add',async (req, res, next) => {
  const user = new User(req.body);
  user.usuario=req.user._id;
  await user.save();
  res.redirect('/verProfesores');
});



  module.exports = router;