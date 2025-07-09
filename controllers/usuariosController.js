const usuarios = require('../models/usuariosModel');

const usuariosController = {
    createusuarios: (req, res) => {
        const newusuario = {
            usuarioname: req.body.usuarioname,
            password: req.body.password,
            role: req.body.role,
        };

        usuarios.create(newusuario, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    getusuariosById: (req, res) => {
        const usuarioId = req.params.id;

        usuarios.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'usuario não encontrado' });
            }
            res.render('usuarios/show', { usuario });
        });
    },

    getAllusuarios: (req, res) => {
        usuarios.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuarios/index', { usuarios });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: (req, res) => {
        const usuarioId = req.params.id;

        usuarios.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'usuario não encontrado' });
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    updateusuarios: (req, res) => {
        const usuarioId = req.params.id;
        const updatedusuario = {
            usuarioname: req.body.usuarioname,
            password: req.body.password,
            role: req.body.role,
        };

        usuarios.update(usuarioId, updatedusuario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    deleteusuarios: (req, res) => {
        const usuarioId = req.params.id;

        usuarios.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    searchusuarios: (req, res) => {
        const search = req.query.search || '';

        usuarios.searchByName(search, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ usuarios });
        });
    },
};

module.exports = usuariosController;
