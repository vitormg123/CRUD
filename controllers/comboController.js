const Combo = require('../models/comboModel');
const Categoria = require('../models/categoriaModel');

const comboController = {

    createCombo: (req, res) => {

        const newCombo = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Combo.create(newCombo, (err, comboId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/combo');
        });
    },

    getComboById: (req, res) => {
        const comboId = req.params.id;

        Combo.findById(comboId, (err, combo) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!combo) {
                return res.status(404).json({ message: 'Combo not found' });
            }
            res.render('combo/show', { combo });
        });
    },
    
    getAllCombo: (req, res) => {
        const categoria = req.query.categoria || null;
        
        combo.getAll(categoria, (err, combo) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('combo/index', { combo, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('combo/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const comboId = req.params.id;

        Combo.findById(comboId, (err, combo) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!combo) {
                return res.status(404).json({ message: 'Combo not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('combo/edit', { combo, categorias });
            });
        });
    },

    updateCombo: (req, res) => {
        const comboId = req.params.id;
        
        const updatedCombo = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Combo.update(comboId, updatedCombo, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/combo');
        });
    },

    deleteCombo: (req, res) => {
        const comboId = req.params.id;

        Combo.delete(comboId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/combo');
        });
    }
};

module.exports = comboController;