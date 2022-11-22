const { imageUpload } = require('../middlewares/imageUpload');
const { formCardapio, saveItemCardapio } = require('../controllers/CardapioController');

const router = require('express').Router();

router.get('/cadastro', formCardapio);
router.post('/cadastro/save', imageUpload.single('image'), saveItemCardapio);

module.exports = router;