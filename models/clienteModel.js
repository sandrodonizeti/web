const pool = require('../config/dbConfig');

class ClienteModel {
    constructor({
        id,
        name,
        username,
        birthDate,
        email,
        sex,
        status = 'Ativado',
        createdAt = new Date(),
        updatedAt,
    }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.birthDate = birthDate;
        this.email = email;
        this.sex = sex;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async createCliente() {
        try {
            const sql = 'INSERT INTO cliente (name, username, birthDate, email, sex, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [this.name, this.username, this.birthDate, this.email, this.sex, this.status, this.createdAt, this.updatedAt];
            const [rows] = await pool.query(sql, values);

            return rows.insertId;
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao cadastrar o cliente.');
        }
    }

    async updateCliente() {
        try {
            const updatedAt = new Date();
            const sql = 'UPDATE cliente SET name = ?, username = ?, birthDate = ?, email = ?, sex = ?, status = ?, updatedAt = ? WHERE id = ?';
            const values = [this.name, this.username, this.birthDate, this.email, this.sex, this.status, updatedAt, this.id];
            const [rows] = await pool.query(sql, values);

            return rows.affectedRows > 0;
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao atualizar o cliente.');
        }
    }

    async deleteCliente() {
        try {
            const sql = 'DELETE FROM cliente WHERE id = ?';
            const [rows] = await pool.query(sql, [this.id]);

            return rows.affectedRows > 0;
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao excluir o cliente.');
        }
    }

    static async findById(id) {
        try {
            const sql = 'SELECT * FROM cliente WHERE id = ?';
            const [rows] = await pool.query(sql, [id]);

            if (rows.length === 0) {
                return null;
            }

            const clienteData = rows[0];
            const cliente = new ClienteModel(clienteData);
            return cliente;
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao buscar o cliente por ID.');
        }
    }

    static async findAll() {
        try {
            const sql = 'SELECT * FROM cliente';
            const [rows] = await pool.query(sql);

            const clientes = rows.map(clienteData => new ClienteModel(clienteData));

            return clientes;
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao buscar todos os clientes.');
        }
    }

    static async findByUsernameOrEmail(usernameOrEmail) {
        try {
            const sql = 'SELECT * FROM cliente WHERE email = ? OR username = ?';
            const [rows] = await pool.query(sql, [usernameOrEmail, usernameOrEmail]);

            if (rows.length === 0) {
                return null;
            }

            const clienteData = rows[0];
            const cliente = new ClienteModel(clienteData);

            return cliente;
        } catch (error) {
            console.error(error);
            throw new Error('Ocorreu um erro ao buscar o cliente por nome de usuário ou email.');
        }
    }
}

module.exports = ClienteModel;
