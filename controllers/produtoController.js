const Produto = require('../models/produtoModel');

// Array fixo com categorias pré-cadastradas
const categoriasFixas = [
  { id: 1, nome: 'Masculino' },
  { id: 2, nome: 'Feminino' },
  { id: 3, nome: 'Infantil' }
];

const produtoController = {
  createProduto: async (req, res) => {
    try {
      const newProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        categoriaId: req.body.categoria
      };

      await Produto.create(newProduto);
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getProdutoById: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.render('produtos/show', { produto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllProdutos: async (req, res) => {
    try {
      const produtos = await Produto.findAll();

      // Passa o array fixo para o view render
      res.render('produtos/index', {
        produtos,
        categorias: categoriasFixas,
        categoriaSelecionada: null
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderCreateForm: async (req, res) => {
    try {
      // Passa o array fixo para o formulário
      res.render('produtos/create', { categorias: categoriasFixas });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderEditForm: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.render('produtos/edit', { produto, categorias: categoriasFixas });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateProduto: async (req, res) => {
    try {
      const produtoId = req.params.id;

      const updatedProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        categoriaId: req.body.categoria
      };

      await Produto.update(updatedProduto, { where: { id: produtoId } });
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteProduto: async (req, res) => {
    try {
      const produtoId = req.params.id;
      await Produto.destroy({ where: { id: produtoId } });
      res.redirect('/produtos');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = produtoController;
