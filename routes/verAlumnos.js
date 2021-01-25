const express = require('express');
const router = express.Router();
const User = require('../models/user');
  
  router.get('/verAlumnos', async (req, res) => {
      const users = await User.find();
  res.render('verAlumnos', {
    users
  });
  })
  

  //Boton eliminar
router.get('/verAlumnos/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await User.remove({_id: id});
  res.redirect('/verAlumnos');
});


//Boton anadir
router.post('/verAlumnos/add',async (req, res, next) => {
  const user = new User(req.body);
  user.usuario=req.user._id;
  await user.save();
  res.redirect('/verAlumnos');
});


//Boton editar
router.get('/verAlumnos/edit/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  res.render('editUser', { user });
});

router.post('/verAlumnos/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/verAlumnos');
});


  
module.exports = router;