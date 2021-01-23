const express = require('express');
const router = express.Router();
const Task = require('../models/task');


//Tareas
router.get('/tasks',isAuthenticated, async (req, res) => {
  const tasks = await Task.find({'usuario':req.user._id});
  res.render('tasks', {
    tasks
  });
});

//Boton anadir
router.post('/tasks/add', isAuthenticated,async (req, res, next) => {
  const task = new Task(req.body);
  task.usuario=req.user._id;
  await task.save();
  res.redirect('/tasks');
});

//Boton de tarea hecha
router.get('/tasks/turn/:id',isAuthenticated, async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/tasks');
});

//Boton editar
router.get('/tasks/edit/:id', isAuthenticated, async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task);
  res.render('edit', { task });
});

router.post('/tasks/edit/:id',isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  await Task.update({_id: id}, req.body);
  res.redirect('/tasks');
});

//Boton eliminar
router.get('/tasks/delete/:id', isAuthenticated,async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({_id: id});
  res.redirect('/tasks');
});

//Boton buscar
router.get('/tasks/search',isAuthenticated, async (req, res, next) => {
  let search = req.query.search;
  console.log(search);
  const tasks = await Task.find({'title' : new RegExp(search, 'i'),'usuario': req.user._id});
  res.render('tasks', {
    tasks
  });
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}
module.exports = router;
