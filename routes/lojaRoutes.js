const express = require('express');
const router = express.Router();
const lojaController = require('../controllers/lojaController');

router.get('/', lojaController.listar);

router.get('/cadastrar', lojaController.formularioCadastrar);

router.post('/cadastrar', lojaController.cadastrar);

router.get('/exibir', lojaController.exibir);

router.get('/:id/editar', lojaController.formularioEditar);

router.post('/:id/editar', lojaController.atualizar);

router.get('/:id/deletar', lojaController.formularioDeletar);

router.post('/:id/deletar', lojaController.deletar);

router.get('/loja1', (req, res) => {
    res.render('loja/loja1');
});

router.get('/loja2', (req, res) => {
    res.render('loja/loja2');
});

router.get('/loja3', (req, res) => {
    res.render('loja/loja3');
});

router.get('/loja4', (req, res) => {
    res.render('loja/loja4');
});

module.exports = router;