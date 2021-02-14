const express = require('express');
const router = express.Router();
const User = require('../models/user');
const alert = require('alert');


//Lista todos los profesores
router.get('/verProfesores', async (req, res) => {
    const users = await User.find();
  res.render('verProfesores', {
      users
  });
});

//Boton eliminar profesor
router.get('/verProfesores/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await User.remove({_id: id});
  res.redirect('/verProfesores');
});

//Boton anadir profesor
router.post('/verProfesores/add',async (req, res, next) => {
  const user = new User(req.body);
  const user2 = await User.findOne({'email': user.email})
  

  if(user2) {

    alert("El email ya existe en la base de datos!");

  } else {

    user.rol="Profesor";
    user.password = user.encryptPassword(req.body.password);
    await user.save();

  }
  res.redirect('/verProfesores');
});

//Boton editar profesor
router.get('/verProfesores/edit/:id', async (req, res, next) => {
  const userIniciado = await User.findById(req.params.id);
  console.log(userIniciado);

  res.render('editUsuarios', {userIniciado});
});

//Boton editar profesor - envia a otra view
router.post('/verProfesores/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/verProfesores');
});

//Boton actualizar 
router.post('/verProfesores/editPassword/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = new User(req.body);
  req.body.password = user.encryptPassword(req.body.password);
  await User.updateOne({_id: id}, req.body);
  res.redirect('/profile');
});

//Boton editar password
router.post('/verProfesores/editPasswordAdmin/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = new User(req.body);
  req.body.password = user.encryptPassword(req.body.password);
  await User.updateOne({_id: id}, req.body);
  res.redirect('/profile');
});

module.exports = router;