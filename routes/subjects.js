const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');


//Tareas
router.get('/verAsignaturas', async (req, res) => {
  const subjects = await Subject.find();
  res.render('verAsignaturas', {
    subjects
  });
});

module.exports = router;
