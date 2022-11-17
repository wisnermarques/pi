const express = require('express');
const bodyParser = require('body-parser');
const Dado = require('./models/Dado');
const adminRoutes = require('./routes/AdminRoutes');

const app = express();

//View engine
app.set("view engine", "ejs");

app.use(express.static("public"));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {

  Dado.findAndCountAll().then((total) => {
    let pages = total.count; //total de registros

    if (pages < 3) {
      pages = 0;
    }
    Dado.findAll({
      limit: 3,
      order: [["id", "DESC"]],
    }).then((dados) => {
      res.render("home", { dados, current: 1, pages });
    });
  });
});

app.get('/pagina/:page', (req, res) => {
  var perPage = 3;
  var current = req.params.page;

  Dado.findAll({
    limit: perPage,
    offset: perPage * current - perPage,
    order: [["id", "DESC"]],
  }).then((dados) => {
    Dado.findAndCountAll().then((total) => {
      const count = total.count;
      const pages = count / perPage;
      res.render("pagina", {
        dados,
        current,
        pages,
      });
    });
  });

});

app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});