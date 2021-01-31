const express = require('express');
const User = require('../models/user');
const router = require('express').Router();
const passport = require('passport');


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
  user.rol="Alumno";
  user.password = user.encryptPassword(req.body.password);
  await user.save();
  res.redirect('/verAlumnos');
});

//Boton editar
router.get('/verAlumnos/edit/:id', async (req, res, next) => {
  const userIniciado = await User.findById(req.params.id);
  res.render('editUsuarios', { userIniciado });
});

router.post('/verAlumnos/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/verAlumnos');
});

router.post('/verAlumnos/editPassword/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = new User(req.body);
  req.body.password = user.encryptPassword(req.body.password);
  await User.updateOne({_id: id}, req.body);
  res.redirect('/profile');
});

module.exports = router;