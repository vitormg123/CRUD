const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');
router.get('/', vendaController.getAllVendas);
router.get('/create', vendaController.renderCreateForm);
router.post('/create', vendaController.createVenda);
router.get('/:id', vendaController.getVendaById);
router.get('/:id/edit', vendaController.renderEditForm);
router.post('/:id/edit', vendaController.updateVenda);
router.post('/:id/delete', vendaController.deleteVenda);

module.exports = router;
