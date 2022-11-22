const Dado = require("../models/Dado");

function formCardapio(req, res) {
    res.render('admin/cadastroItemCardapio');
}

function saveItemCardapio(req, res) {
    const { nome, descricao, preco } = req.body;
    const img = req.file.originalname;
    try {
        Dado.create({
            nome,
            descricao,
            preco,
            img
        }) 
    } catch (error) {
        console.log(error);
    }
    res.redirect('/');
}

module.exports = { formCardapio, saveItemCardapio };