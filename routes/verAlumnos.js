const express = require('express');
const router = express.Router();
const User = require('../models/user');
const alert = require('alert');


//Lista todos los alumnos
router.get('/verAlumnos', async (req, res) => {
    const users = await User.find();
  res.render('verAlumnos', {
    users
  });
})

//Boton eliminar alumno
router.get('/verAlumnos/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await User.remove({_id: id});
  res.redirect('/verAlumnos');
});

//Boton anadir alumno
router.post('/verAlumnos/add',async (req, res, next) => {
  const user = new User(req.body);
  const user2 = await User.findOne({'email': user.email})

  if(user2) {
    alert("El email ya existe en la base de datos!");

  } else {
    user.rol="Alumno";
    user.password = user.encryptPassword(req.body.password);
    await user.save();
  }


  res.redirect('/verAlumnos');
});

//Boton editar alumno - envia a otra view
router.get('/verAlumnos/edit/:id', async (req, res) => {
  const userIniciado = await User.findById(req.params.id);
  res.render('editUsuarios', { userIniciado });
});

//Boton actualizar
router.post('/verAlumnos/edit/:id', async (req, res) => {
  const { id } = req.params;
  await User.update({_id: id}, req.body);
  res.redirect('/verAlumnos');
});

//Boton para editar la password
router.post('/verAlumnos/editPassword/:id', async (req, res, next) => {
  const { id } = req.params;
  const user = new User(req.body);
  req.body.password = user.encryptPassword(req.body.password);
  await User.updateOne({_id: id}, req.body);
  res.redirect('/profile');
});

module.exports = router;