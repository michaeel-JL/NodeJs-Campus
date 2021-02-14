const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Subject = require('../models/subject');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({

  host:'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: 'nodeifp@gmail.com',
    pass:'contrasena1'
  }
});

//Lista todas las asignaturas
router.get('/verAsignaturas', async (req, res, next) => {
  const subjects = await Subject.find();
    res.render('verAsignaturas',{
      subjects
    });
  });

//Boton eliminar asignatura
router.get('/verAsignaturas/delete/:id', async (req, res) => {
  let { id } = req.params;
  await Subject.remove({_id: id});
  res.redirect('/verAsignaturas');
});

//Boton anadir asignatura
router.post('/verAsignaturas/add', async(req, res) => {
  const links = req.body.link

  var ejemplo = links.split(",");
  const subject = new Subject();
  subject.title = req.body.title;
  subject.description = req.body.description;

  await subject.save();
  for (let i = 0; i < ejemplo.length; i++) {
  await Subject.updateOne({_id: subject._id}, {$push:{link:ejemplo[i]}});
  }
  res.redirect('/verAsignaturas');
});

//Boton editar asignatura - envia a otra view
router.get('/verAsignaturas/edit/:id', async (req, res) => {
  const subjects = await Subject.findById(req.params.id);
  const users = await User.find();
  console.log(subjects);
  res.render('editAsignaturas', { subjects, users });
});

//Boton actualizar
router.post('/verAsignaturas/edit/:id', async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findById(id);
  await Subject.update({_id: id}, req.body);

  //Creamos las variables necesarias
  var mensaje = `La asignatura ${subject.title} ha sido modificada.`
  const alumnos = subject.alumnos;
  const users = [];

  //Cogemos todos los alumnos de la asignatura
  for(var i =0; alumnos.length > i; i++){
    
    const user = await User.findById(alumnos[i]);
    console.log("EMAIL: " + user.email);
    users.push(user.email);

  }
  var mailOptions = {
    from: 'nodeifp@gmail.com',
    to: `${users}`,
    subject: 'Novedades en tu asignatura!',
    text: mensaje
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
    }else{
      console.log('Email enviado: '  + info.response);
    }

  });
  res.redirect('/verAsignaturas');
});

//Añadir PROFESOR
router.post('/verAsignaturas/addProfesor/:id',async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  const seguir = true;
  const id = subject._id;

  for(var i = 0; subject.profesores.length > i; i++){

      if(subject.profesores[i].toString() == req.body.id.toString()){
        console.log("ID PROFESOR REPETIDO ");
        seguir = false;
      }
  }
  if(seguir == true){
    await Subject.updateOne({_id: subject._id}, {$push:{profesores:req.body.id}});
    console.log("CAMBIO REALIZADO ");
  }
  res.redirect('back');
});

//Añadir ALUMNO
router.post('/verAsignaturas/addAlumno/:id',async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  const seguir = true;

  for(var i = 0; subject.alumnos.length > i; i++){

      if(subject.alumnos[i].toString() == req.body.id.toString()){
        seguir = false;
      }
  }
  if(seguir == true){
    await Subject.updateOne({_id: subject._id}, {$push:{alumnos:req.body.id}});
  }
  res.redirect('back');
});

//ELIMINAR PROFESOR DE ASIGNATURAS
router.post('/verAsignaturas/deleteProfesor/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  await Subject.update({_id: subject._id}, {$pull:{profesores:req.body.id}});
  res.redirect('back');
});

//ELIMINAR ALUMNO DE ASIGNATURAS
router.post('/verAsignaturas/deleteAlumno/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  await Subject.update({_id: subject._id}, {$pull:{alumnos:req.body.id}});
  res.redirect('back');
});

//agregamos la ruta
router.post('/carga', (req, res) => {
  let EDFile=req.files.file

  EDFile.mv(`./files/${EDFile.name}`, async err => {

    if(err){
    return res.status(500).send({message : err})
    }else{
      const id = req.body.id;
      
      await Subject.updateOne({_id:id}, {$push:{file:EDFile.name}});
      // return res.status(200).send({message: 'File Upload'})
      res.redirect('back');
    }
  })

});

//Descargar archivos
router.get('/download/:file', function(req, res){
  var file = `./files/${req.params.file}`;
  res.download(file);
});

module.exports = router;