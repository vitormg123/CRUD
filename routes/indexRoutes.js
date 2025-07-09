const express = require('express');
const router = express.Router();
const Produtos = require('../models/produtoModel');

router.get('/', (req, res) => {
  Produtos.getAll(null, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).send('Erro ao carregar produtos');
    }
    res.render('index', { title: 'Heranças do Sul', produtos: results });
  });
});

module.exports = router;
