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

  router.post('/verAsignaturas/add', async(req, res) => {
    const links = req.body.link
    var ejemplo = links.split(",");
    const subject = new Subject();
    subject.title = req.body.title;
    subject.description = req.body.description;
    console.log(subject);
    await subject.save();
    for (let i = 0; i < ejemplo.length; i++) {
    await Subject.updateOne({_id: subject._id}, {$push:{link:ejemplo[i]}}); 
  
    }
    res.redirect('/verAsignaturas/edit');
  
  });

//Añadir PROFESOR
router.post('/verAsignaturas/addProfesor/:id',async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  await Subject.updateOne({_id: subject._id}); 
  res.redirect('/verAsignaturas');

});

//Añadir ALUMNO
router.post('/verAsignaturas/addAlumno/:id',async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  await Subject.updateOne({_id: subject._id}, {$push:{alumnos:req.body.id}}); 
  res.redirect('/verAsignaturas');

});

//Boton eliminar
router.get('/verAsignaturas/delete/:id', async (req, res) => {
  let { id } = req.params;
  await Subject.remove({_id: id});
  res.redirect('/verAsignaturas');
});
  
//Boton editar
router.get('/verAsignaturas/edit/:id', async (req, res) => {
  const subjects = await Subject.findById(req.params.id);
  const users = await User.find();
  console.log(subjects);
  res.render('editAsignaturas', { subjects, users });
});


router.post('/verAsignaturas/edit/:id', async (req, res) => {
  const { id } = req.params;
  await Subject.update({_id: id}, req.body);
  res.redirect('/verAsignaturas');
});



module.exports = router;