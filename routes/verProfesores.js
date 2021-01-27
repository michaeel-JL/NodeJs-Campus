const express = require('express');
const router = express.Router();
const User = require('../models/user');



router.get('/verProfesores', async (req, res) => {
    const users = await User.find();
  res.render('verProfesores', {
      users
  });
});

//Boton eliminar
router.get('/verProfesores/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await User.remove({_id: id});
  res.redirect('/verProfesores');
});

//Boton anadir
router.post('/verProfesores/add',async (req, res, next) => {
  const user = new User(req.body);
  user.rol="Profesor";
  user.password = user.encryptPassword(req.body.password);

  await user.save();
  res.redirect('/verProfesores');
});

//Boton editar
router.get('/verProfesores/edit/:id', async (req, res, next) => {
  const userIniciado = await User.findById(req.params.id);
  console.log(userIniciado);

  res.render('editUsuarios', {userIniciado});
});

router.post('/verProfesores/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/verProfesores');
});

router.post('/verProfesores/editPassword/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = new User(req.body);
  req.body.password = user.encryptPassword(req.body.password);
  await User.updateOne({_id: id}, req.body);
  res.redirect('/profile');
});

router.post('/verProfesores/editPasswordAdmin/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = new User(req.body);
  req.body.password = user.encryptPassword(req.body.password);
  await User.updateOne({_id: id}, req.body);
  res.redirect('/profile');
});

  module.exports = router;
