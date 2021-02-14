const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
const Subject = require('../models/subject');
const alert = require('alert');

const fs = require('fs'); // filesystem
const csv = require('csv-parser');// Encargado de parsear
const result=[];

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

router.get('/signin', (req, res, next) => {
  res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/signin');
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

router.post('/addUserCSV', (req, res) => {
    var file=req.files.file;

  if(file.name == "alumnos.csv" || file.name == "profesores.csv"){
    file.mv(`./files/csv/${file.name}`,err=>{

      if(err) return res.status(500).send({message:err});

      readCsvUsers(`./files/csv/${file.name}`);
      res.redirect('back');
    });
  }else if(file.name == "asignaturas.csv"){
      file.mv(`./files/csv/${file.name}`,err=>{

          if(err) return res.status(500).send({message:err});
    
          readCsvSubjects(`./files/csv/${file.name}`);
          res.redirect('back');
        });
  }else{
    alert("Error en el nombre del archivo CSV!");
  }
});

const readCsvUsers = async (fileName) => {
  const result=[];

  await fs.createReadStream(fileName)
    .pipe(csv({ separator: "," }))
    .on("data", (data) => result.push(data))
    .on("end", () => {
      result.map( async user=>{

        const usuario2 = await User.findOne({'email': user.email});
        if(usuario2) {
            console.log("Email repetido");
          } else {
            var usuario = new User;
            usuario.email = user.email;
            usuario.password = usuario.encryptPassword(user.password);
            usuario.rol=user.rol;
            usuario.save();
        }
       });
  });

  fs.close;
};
     
const readCsvSubjects= async (fileName) => {
  const result=[];
  var repetido = false;

  await fs.createReadStream(fileName)
    .pipe(csv({ separator: "," }))
    .on("data", (data) => result.push(data))
    .on("end", () => {
      result.map( async subject=>{

        const subject2 = await Subject.findOne({'title': subject.title});
        if(subject2) {
            console.log("Asignatura repetida");
        } else {
            var asignatura = new Subject;
            asignatura.title=subject.title;
            asignatura.description=subject.description;
            asignatura.save();
        }
       });
  });
  fs.close;
};



//ir a notificaciones
router.get('/notificaciones', (req, res) => {
      res.render('notificaciones');
});

//Enviar mensajes
router.post('/mensajes/enviarMensajes', async(req, res)=>{

  var emailprofe = req.body.email;
  var sugerencia = req.body.mensaje;

  const user = await User.find();

  for(var i = 0; user.length > i; i++){
      if(user[i].email.toString() == emailprofe){

        await User.update({email: emailprofe}, {$push:{mensaje:sugerencia}});
      }
}
    res.render('sugerencias');
});

//Vamos a la view sugerencias
router.get('/sugerencias', (req, res, next) => {
  res.render('sugerencias');
});

//Boton eliminar asignatura
router.get('/notificaciones/delete/:i', async (req, res) => {
  req.user.mensaje.splice(req.params.i,1);
  await User.updateOne({_id: req.user.id}, {mensaje: req.user.mensaje});
 res.redirect('/notificaciones');
});


module.exports = router;