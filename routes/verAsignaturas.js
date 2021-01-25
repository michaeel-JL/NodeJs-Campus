const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Subject = require('../models/subject');

router.get('/verAsignaturas', (req, res, next) => {
    res.render('verAsignaturas');
  })


  router.post('/verAsignaturas/add',(req, res) => {
    const subject = new Subject(req.body);

    // if(req.user.)
    // subject.usuario=req.user._id;
    subject.save();
    res.redirect('/verAsignaturas');
  });
  
  

  //Boton editar
router.get('/verAsignaturas/edit/:id', async (req, res, next) => {
  const asig = await Subject.findById(req.params.id);
  console.log(asig);
  res.render('infoAsignatura', { asig });
});

//Boton eliminar
router.get('/verAsignaturas/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Subject.remove({_id: id});
  res.redirect('/verAsignaturas');
});


    module.exports = router;