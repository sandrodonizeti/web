const pool = require('../config/dbConfig');

class Loja {
    constructor(loja) {
        this.nome = loja.nome;
        this.endereco = loja.endereco;
        this.cidade = loja.cidade;
        this.estado = loja.estado;
        this.telefone = loja.telefone;
        this.email = loja.email;
        this.dataCadastro = new Date();
        this.dataAtualizacao = new Date();
    }

    static async buscarTodos() {
        const query = 'SELECT * FROM loja';
        const [rows] = await pool.promise().query(query);
        return rows;
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM loja WHERE id = ?';
        const [rows] = await pool.promise().query(query, [id]);
        return rows[0];
    }

    static async criar(loja) {
        const query = 'INSERT INTO loja SET ?';
        const [result] = await pool.promise().query(query, loja);
        const id = result.insertId;
        return new Loja({ ...loja, id });
    }

    static async atualizar(id, dadosAtualizados) {
        const query = 'UPDATE loja SET ?, dataAtualizacao = NOW() WHERE id = ?';
        await pool.promise().query(query, [dadosAtualizados, id]);
        const lojaAtualizada = await Loja.buscarPorId(id);
        return lojaAtualizada;
    }

    static async deletarPorId(id) {
        const query = 'DELETE FROM loja WHERE id = ?';
        const [result] = await pool.promise().query(query, [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Loja;
