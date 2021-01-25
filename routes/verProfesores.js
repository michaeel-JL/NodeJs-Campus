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


//Boton editar
router.get('/verProfesores/edit/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  res.render('editUser', { user });
});

router.post('/verProfesores/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/verProfesores');
});

router.post('/verProfesores/edit2.0/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/profile');
});

router.post('/verProfesores/edit3.0/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/profile');
});

  module.exports = router;