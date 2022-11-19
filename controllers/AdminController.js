const bcrypt = require('bcryptjs');

const User = require("../models/User");

async function loginForm(req, res, next) {
  const msg = await req.consumeFlash('error');
  res.render('admin/login', { msg });
}

async function login(req, res) {
  const { username, password } = req.body;

  if (username == undefined || username == '') {
    await req.flash('error', 'Usuário ou senha inválida, tente novamente!');
    res.redirect('/admin');
  } else if (password == undefined || username == '' || password.length < 6) {
    await req.flash('error', 'Usuário ou senha inválida, tente novamente!');
    res.redirect('/admin');
  } else {
    User.findOne({
      where: { username: username }
    }).then(async user =>  {
      if (user == undefined) {
        await req.flash('error', 'Usuário ou senha inválida, tente novamente!');
        res.redirect('/admin');
      } else {
        const correct = bcrypt.compareSync(password, user.password);
        if (correct) {
          req.session.user = {
            id: user.id,
            username: user.username
          };
          res.redirect('/admin/users');
        } else {
          await req.flash('error', 'Usuário ou senha inválida, tente novamente!');
          res.redirect('/admin');
        }

      }
    })
  }
}

function logout(req, res) {
  req.session.user = undefined;
  res.redirect("/admin");
}

function formCadastroUsuario(req, res) {
  res.render('admin/cadastroUsuario');
}

function cadastroUsuario(req, res) {
  const { username, password } = req.body;

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
module.exports = { loginForm, formCadastroUsuario, cadastroUsuario, login, logout };