const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {
  createProduto: async (req, res) => {
    try {
      const newProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: parseFloat(req.body.preco),
        quantidade: parseInt(req.body.quantidade, 10),
        categoriaId: parseInt(req.body.categoria, 10)
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

  getAllProdutos: async (_, res) => {
    try {
      const produtos = await Produto.findAll();
      // Busca todas as categorias para exibir no view
      const categorias = await Categoria.getAll();
      // Passa as categorias do banco para o view render
      res.render('produtos/index', {
        produtos
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderCreateForm: async (_, res) => {
    try {
      const categorias = await Categoria.findAll();
      // Passa as categorias do banco para o formulário
      res.render('produtos/create', { categorias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderEditForm: async (req, res) => {
    try {
      const produtoId = req.params.id;
      const produto = await Produto.findByPk(produtoId);
      const categorias = await Categoria.findAll();
      
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.render('produtos/edit', { produto, categorias });
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
        preco: parseFloat(req.body.preco),
        quantidade: parseInt(req.body.quantidade, 10),
        categoriaId: parseInt(req.body.categoria, 10)
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
