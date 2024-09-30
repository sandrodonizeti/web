const Loja = require('../models/lojaModel');

const listar = async (req, res) => {
    try {
        const lojas = await Loja.buscarTodos();
        res.render('loja/exibir', { lojas });
    } catch (error) {
        console.error(error);
        res.render('error', { mensagem: 'Ocorreu um erro ao buscar as lojas.', error: error });
    }
};

const formularioCadastrar = (req, res) => {
    res.render('loja/formularioCadastrar');
};

const cadastrar = async (req, res) => {
    try {
        console.log(req.body); 
        const loja = new Loja(req.body);
        await Loja.criar(loja);
        res.redirect('/lojas');
    } catch (error) {
        console.error(error);
        res.render('error', { mensagem: 'Ocorreu um erro ao cadastrar a loja.' });
    }
};

const exibir = async (req, res) => {    
    try {
        const loja = await Loja.buscarPorId(req.params.id);
        console.log(loja);
        res.render('loja/exibir', { loja });
    } catch (error) {
        console.error(error);
        res.render('error', { mensagem: 'Ocorreu um erro ao buscar a loja.', error: error });
    }
};

const formularioEditar = async (req, res) => {
    try {
        const loja = await Loja.buscarPorId(req.params.id);
        res.render('loja/formularioEditar', { loja });
    } catch (error) {
        console.error(error);
        res.render('error', { mensagem: 'Ocorreu um erro ao buscar a loja.' });
    }
};

const atualizar = async (req, res) => {
    const id = req.params.id;
    const dadosAtualizados = req.body;

    try {
        const lojaAtualizada = await Loja.atualizar(id, dadosAtualizados);
        res.redirect('/lojas');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const formularioDeletar = async (req, res) => {
    const id = req.params.id;

    try {
        const loja = await Loja.buscarPorId(id);
        if (!loja) {
            res.status(404).json({ message: `Loja com o ID ${id} não encontrada` });
        } else {
            res.render('loja/formularioDeletar', { loja });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletar = async (req, res) => {
    const id = req.params.id;

    try {
        const resultado = await Loja.deletarPorId(id);
        if (resultado) {
            res.redirect('/lojas');
        } else {
            res.status(404).json({ message: `Loja com o ID ${id} não encontrada` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    listar,
    formularioCadastrar,
    cadastrar,
    exibir,
    formularioEditar,
    atualizar,
    formularioDeletar,
    deletar
};
