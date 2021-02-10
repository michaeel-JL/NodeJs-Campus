const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');
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
    var fileUsers=req.files.file;
    fileUsers.mv(`./files/users/${fileUsers.name}`,err=>{

      if(err) return res.status(500).send({message:err});

      readCsvFile(`./files/users/${fileUsers.name}`);
  res.redirect('back');
    });
  }) ;

const readCsvFile = async (fileName) => {
      const result=[];
      var repetido = false;

      await fs.createReadStream(fileName)
        .pipe(csv({ separator: "," }))
        .on("data", (data) => result.push(data))
        .on("end", () => {
            result.map( async user=>{

              const usuario2 = await User.findOne({'email': user.email})
              if(usuario2) {
                console.log("Email repetido");
                repetido = true;
              } else {
                var usuario = new User;
                usuario.email=user.email;
                usuario.password=user.password;
                usuario.rol=user.rol;
                usuario.save();
            }
          });
          if(!repetido){
            alert("Uno o varios emails del archivo CSV ya existen. Se han añadido los nuevos.");
          }else{
            alert("Todos han sido añadidos cone exito");
          }
        })
        fs.close;
     };

module.exports = router;