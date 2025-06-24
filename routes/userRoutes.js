const express = require('express');
const usuarioController = require('../controllers/userController');
const router = express.Router();

router.get('/', usuarioController.getAllusuarios);
router.get('/search', usuarioController.searchusuarios); // Adicione esta rota
router.get('/new', usuarioController.renderCreateForm);
router.post('/', usuarioController.createusuario);
router.get('/:id', usuarioController.getusuarioById);
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateusuario);
router.delete('/:id', usuarioController.deleteusuario);

module.exports = router;