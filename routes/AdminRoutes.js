const { Router } = require('express');
const router = Router();

const { loginForm, formCadastroUsuario, cadastroUsuario, login } = require('../controllers/AdminController');

router.get('/', loginForm);

router.get('/cadastro/user', formCadastroUsuario);

router.post('/cadastro/user', cadastroUsuario);

router.post('/user/login', login);

module.exports = router;
