const express = require('express');
const comboController = require('../controllers/comboController');
const router = express.Router();

router.get('/', comboController.getAllCombo);
router.get('/new', comboController.renderCreateForm);
router.post('/', comboController.createCombo);
router.get('/:id', comboController.getComboById);
router.get('/:id/edit', comboController.renderEditForm);
router.put('/:id', comboController.updateCombo);
router.delete('/:id', comboController.deleteCombo);

module.exports = router;