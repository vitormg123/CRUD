const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const router = express.Router();

router.get('/', usuariosController.getAllusuarios);
router.get('/search', usuariosController.searchusuarios);
router.get('/create', usuariosController.renderCreateForm);  // alterado de '/new' para '/create'
router.post('/', usuariosController.createusuarios);
router.get('/:id', usuariosController.getusuariosById);
router.get('/:id/edit', usuariosController.renderEditForm);
router.put('/:id', usuariosController.updateusuarios);
router.delete('/:id', usuariosController.deleteusuarios);

module.exports = router;
