const ClienteModel = require('../models/clienteModel');

class clienteController {
  static async index(req, res) {
    try {
      const clientes = await ClienteModel.findAll();
      return res.render('clientes/indexCliente', { clientes });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  static async showCliente(req, res) {
    try {
      const id = req.params.id;
      const cliente = await ClienteModel.findById(id);

      if (!cliente) {
        return res.status(404).render('404.ejs');
      }

      res.render('clientes/showCliente', { cliente });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  static async createClienteForm(req, res) {
    res.render('clientes/createCliente');
  }

  static async createCliente(req, res) {
    try {
      const { name, username, birthDate, email, sex, status } = req.body;

      const cliente = new ClienteModel({
        name,
        username,
        birthDate,
        email,
        sex,
        status
      });

      console.log(cliente);

      const insertedClienteId = await cliente.createCliente();

      res.redirect(`/clientes/exibirCliente/${insertedClienteId}`);
    } catch (error) {
      console.log(error);
      return res.status(500).render('error.ejs', { error });
    }
  }

  static async createClienteForm(req, res) {
    res.render('clientes/createCliente');
  }

  static async createCliente(req, res) {
    try {
      const { name, username, birthDate, email, sex, status } = req.body;

      const user = new ClienteModel({
        name,
        username,
        birthDate,
        email,
        sex,
        status
      });

      console.log(user);

      const insertedUserId = await user.createCliente();

      res.redirect(`/clientes/exibir/${insertedUserId}`);
    } catch (error) {
      console.log(error);
      return res.status(500).render('error.ejs', { error });
    }
  }


  static async editClienteForm(req, res) {
    try {
      const id = req.params.id;
      const cliente = await ClienteModel.findById(id);

      if (!cliente) {
        return res.status(404).render('404.ejs');
      }

      if (cliente.birthDate) cliente.birthDate = new Date(cliente.birthDate).toISOString().split('T')[0];

      res.render('clientes/editCliente', { cliente });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  static async editCliente(req, res) {
    try {
      const id = req.params.id;
      const { name, username, birthDate, email, sex, status } = req.body;

      const cliente = new ClienteModel({
        id,
        name,
        username,
        birthDate,
        email,
        sex,
        status
      });

      const result = await cliente.updateCliente();

      if (!result) {
        return res.status(404).render('404.ejs');
      }

      res.redirect(`/clientes/exibir/${id}`);
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  static async deleteForm(req, res) {
    try {
      const id = req.params.id;
      const cliente = await ClienteModel.findById(id);

      if (!cliente) {
        return res.status(404).render('404.ejs');
      }

      res.render('clientes/deleteCliente', { cliente });
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  static async editCliente(req, res) {
    try {
      const id = req.params.id;
      const { name, username, birthDate, email, sex, status } = req.body;

      const user = new ClienteModel({
        id,
        name,
        username,
        birthDate,
        email,
        sex,
        status
      });

      const result = await user.updateCliente();

      if (!result) {
        return res.status(404).render('404.ejs'); 
      }

      res.redirect(`/clientes/exibir/${id}`);
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id;

      const cliente = new ClienteModel({ id });

      const result = await cliente.deleteCliente(); // Corrigido para usar o método correto

      if (!result) {
        return res.status(404).render('404.ejs');
      }

      res.redirect('/clientes');
    } catch (error) {
      return res.status(500).render('error.ejs', { error });
    }
  }
}

module.exports = clienteController;
