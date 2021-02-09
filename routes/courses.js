const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Subject = require('../models/subject');

//Lista todas las asignaturas
router.get('/courses', async (req, res) => {
    const courses = await Course.find();
      res.render('courses',{
        courses
      });
    });

//Boton elminar cursos
router.get('/courses/delete/:id', async (req, res) => {
    let { id } = req.params;
    await Course.remove({_id: id});
    res.redirect('/courses');
  });


//Boton anadir asignatura - Comprobrar
router.post('/courses/add', async(req, res) => {
    const course = new Course();
    course.name = req.body.name;
    course.type = req.body.type;
    await course.save();
    res.redirect('/courses');
  });

//Boton editar curso - envia a otra view
router.get('/courses/edit/:id', async (req, res) => {
    const courses = await Course.findById(req.params.id);
    const subjects = await Subject.find();
    console.log(courses);
    res.render('editCourses', { courses, subjects });
  });

//Boton actualizar
router.post('/courses/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Course.update({_id: id}, req.body);
    res.redirect('/courses');
  
  });

//ELIMINAR ASIGNATURAS DE CURSOS
router.post('/courses/deleteSubject/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  await Course.update({_id: course._id}, {$pull:{subjects:req.body.id}});
  res.redirect('back');
});

//Añadir ASIGNATURA
router.post('/courses/addSubject/:id',async (req, res) => {
  const course = await Course.findById(req.params.id);
  const seguir = true;
  console.log("Entro en router..... ");


  for(var i = 0; course.subjects.length > i; i++){

      if(course.subjects[i].toString() == req.body.id.toString()){
        console.log("ID ASIGNATURA REPETIDO ");
        seguir = false;
      }
  }
  if(seguir == true){
    await Course.updateOne({_id: course._id}, {$push:{subjects:req.body.id}});
    console.log("CAMBIO REALIZADO ");
  }
  res.redirect('back');
});

module.exports = router;