var express = require('express');
var router = express.Router();
const Produto = require('../models/Produto'); // Ajuste o caminho se necessário

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const produtos = await Produto.find();
    res.render('index', { title: 'Heranças do Sul', produtos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar produtos');
  }
});

module.exports = router;
