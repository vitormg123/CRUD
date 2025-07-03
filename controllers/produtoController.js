const Produto = require('../models/produtoModel');
const Categoria = require('../models/categoriaModel');

const produtoController = {
    createProduto: (req, res) => {
        const newProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Produto.create(newProduto, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    getProdutoById: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produtos || produtos.length === 0) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            const produto = produtos[0];
            res.render('produtos/show', { produto });
        });
    },

    getAllProdutos: (req, res) => {
        const categoria = req.query.categoria || null;

        Produto.getAll(categoria, (err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('produtos/index', { produtos, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    getNovidades: (req, res) => {
        Produto.getNovidades((err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('produtos/index', { produtos, categorias, categoriaSelecionada: null });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('produtos/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produtos || produtos.length === 0) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            const produto = produtos[0];

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('produtos/edit', { produto, categorias });
            });
        });
    },

    updateProduto: (req, res) => {
        const produtoId = req.params.id;

        const updatedProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Produto.update(produtoId, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    deleteProduto: (req, res) => {
        const produtoId = req.params.id;

        Produto.delete(produtoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    }
};

module.exports = produtoController;
