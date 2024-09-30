const express = require('express');
const clienteController = require('../controllers/clienteController');
const router = express.Router();

router.get('/', clienteController.index);

router.get('/exibir/:id', clienteController.showCliente);

router.get('/cadastrar/', clienteController.createClienteForm);
router.post('/cadastrar/', clienteController.createCliente);

router.get('/atualizar/:id', clienteController.editClienteForm);
router.post('/atualizar/:id', clienteController.editCliente);

router.get('/deletar/:id', clienteController.deleteForm);
router.post('/deletar/:id', clienteController.delete);

module.exports = router;
