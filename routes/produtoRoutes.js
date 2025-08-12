const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.get('/', produtoController.getAllProdutos);
router.get('/create', produtoController.renderCreateForm);
router.post('/', produtoController.createProduto);

// Se quiser, pode omitir essa rota de novidades ou manter sem categorias dinâmicas
// router.get('/novidades', produtoController.getNovidades);

router.get('/:id', produtoController.getProdutoById);
router.get('/:id/edit', produtoController.renderEditForm);
router.put('/:id', produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
