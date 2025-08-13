const Categoria = require('../models/categoriaModel');

const categoriaController = {
  // Criar uma nova categoria
  createCategoria: async (req, res) => {
    try {
      const newCategoria = {
        nome: req.body.nome
      };

      await Categoria.create(newCategoria);
      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Buscar categoria pelo ID
  getCategoriaById: async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const categoria = await Categoria.findByPk(categoriaId);

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria not found' });
      }

      res.render('categorias/show', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Listar todas as categorias
  getAllCategorias: async (_req, res) => {
    try {
      const categorias = await Categoria.findAll();
      res.render('categorias/index', { categorias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Renderizar formulário de criação
  renderCreateForm: (_req, res) => {
    res.render('categorias/create');
  },

  // Renderizar formulário de edição
  renderEditForm: async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const categoria = await Categoria.findByPk(categoriaId);

      if (!categoria) {
        return res.status(404).json({ message: 'Categoria not found' });
      }

      res.render('categorias/edit', { categoria });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Atualizar categoria
  updateCategoria: async (req, res) => {
    try {
      const categoriaId = req.params.id;
      const updatedCategoria = {
        nome: req.body.nome
      };

      const [updatedRows] = await Categoria.update(updatedCategoria, {
        where: { id: categoriaId }
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: 'Categoria not found' });
      }

      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Deletar categoria
  deleteCategoria: async (req, res) => {
    try {
      const categoriaId = req.params.id;

      const deletedRows = await Categoria.destroy({
        where: { id: categoriaId }
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: 'Categoria not found' });
      }

      res.redirect('/categorias');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = categoriaController;
