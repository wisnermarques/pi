const bcrypt = require('bcryptjs');

const User = require("../models/User");

function loginForm(req, res) {
  res.render('admin/login');
}

function login(req, res) {
  const { username, password } = req.body;

  if (username == undefined || username == '') {
    res.redirect('/admin');
  }

  if (password == undefined || password.length < 6) {
    res.redirect('/admin');
  }

  User.findOne({
    where: { username: username}
  }).then(user => {
    if(user == undefined) {
      res.redirect('/admin')
    } else {
      const correct = bcrypt.compareSync(password, user.password);
      if(correct) {
        res.send('ok');
      } else {
        res.redirect('/admin')
      }
    }
  })
}

function formCadastroUsuario(req, res) {
  res.render('admin/cadastroUsuario');
}

function cadastroUsuario(req, res) {
  const { username, password } = req.body;

  if (username == undefined || username == '') {
    res.redirect('/admin/cadastro/user');
  }

  if (password == undefined || password.length < 6) {
    res.redirect('/admin/cadastro/user');
  }

  //SELECT * FROM usuarios WHERE usuario = 'wisner'
  User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (user != undefined) {
      res.redirect('/admin');
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      try {
        User.create({
          username,
          password: hash,
          eAdmin: false
        })
      } catch (error) {
        console.log(error);
      }
      res.redirect('/admin');
    }
    
  }).catch(error => {
    console.log(error)
  });

}
module.exports = { loginForm, formCadastroUsuario, cadastroUsuario, login };