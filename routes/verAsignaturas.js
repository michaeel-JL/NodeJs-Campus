const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Subject = require('../models/subject');

router.get('/verAsignaturas', async (req, res, next) => {
  const subjects = await Subject.find();
    res.render('verAsignaturas',{
      subjects
    });
  });

router.post('/verAsignaturas/add',(req, res) => {
  const subject = new Subject(req.body);
  subject.save();
  res.redirect('/verAsignaturas');
});

//Boton eliminar
router.get('/verAsignaturas/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Subject.remove({_id: id});
  res.redirect('/verAsignaturas');
});
  
//Boton editar
router.get('/verAsignaturas/edit/:id', async (req, res, next) => {
  const subjects = await Subject.findById(req.params.id);
  const users = await User.find();
  console.log(subjects);
  res.render('editSubject', { subjects, users });
});
router.post('/verAsignaturas/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Subject.update({_id: id}, req.body);
  res.redirect('/verAsignaturas');
});

module.exports = router;