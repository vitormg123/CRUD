const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {
  createProduto: async (req, res) => {
    try {
      const newProduto = {
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        quantidade: req.body.quantidade,
        categoriaId: req.body.categoria // FK: categoriaId, pega o id enviado do formulário
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

      const produto = await Produto.findByPk(produtoId, {
        include: Categoria
      });

      if (!produto) {
        return res.status(404).json({ message: 'Produto not found' });
      }

      res.render('produtos/show', { produto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getAllProdutos: async (req, res) => {
    try {
      const categoria = req.query.categoria || null;

      const where = categoria ? { categoriaId: categoria } : undefined;

      const produtos = await Produto.findAll({
        where,
        include: Categoria
      });

      const categorias = await Categoria.findAll();

      res.render('produtos/index', {
        produtos,
        categorias,
        categoriaSelecionada: categoria
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getNovidades: async (req, res) => {
    try {
      const { Op } = require('sequelize');
      const ontem = new Date();
      ontem.setDate(ontem.getDate() - 1);

      const produtos = await Produto.findAll({
        where: {
          createdAt: { [Op.gte]: ontem }
        },
        include: Categoria,
        order: [['createdAt', 'DESC']]
      });

      const categorias = await Categoria.findAll();

      res.render('produtos/index', {
        produtos,
        categorias,
        categoriaSelecionada: null
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderCreateForm: async (req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.render('produtos/create', { categorias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderEditForm: async (req, res) => {
    try {
      const produtoId = req.params.id;

      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ message: 'Produto not found' });
      }

      const categorias = await Categoria.findAll();
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
