const express = require('express');
const router = express.Router();
const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: {
        model: Categoria,
        attributes: ['nome']
      }
    });

    const categorias = await Categoria.findAll();

    // Renderiza a view de produtos diretamente
    res.render('produtos/index', { produtos, categorias, categoriaSelecionada: null });
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    res.status(500).send('Erro ao carregar produtos');
  }
});

module.exports = router;
