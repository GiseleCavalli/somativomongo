const Client = require("../schemas/clientSchema");

const ClientController = {
  async listAll(_, response, next) {
    

    try {
      const clients = await Client.find();
      response.status(200).json(clients);
    
    } catch (error) {
      response.status(500).json({ 
        error: "Registro falhou.",
        message: error,
      });
    }
  },

  async create(require, response, next) {
    const client = new Client({
      name: require.body.name,
      address: require.body.address,
      nationality: require.body.nationality,
      email: require.body.email,
      phone: require.body.phone,
    });

    client.save((error, _) => {
      if (error) {
        return response.status(400).send({
          error: "Erro ao criar usuário",
          message: error,
        });
      }

      return response.status(200).send({
        message: "Cliente criado com suceeso.",
      });
    });
  },

  async getById(require, response) {
    const id = require.params.id;

    try {
      const client = await Client.findOne({ _id: id });
      response.status(200).json(client);
    
    } catch (err) {
      return response.status(404).json({ 
        message: "Cliente não encontrado..",
        error: err
      });
    }
  },

  async update(require, response) {
    const id = require.params.id;

    const client = {
      fullName: require.body.fullName,
      address: require.body.address,
      nationality: require.body.nationality,
      cpf: require.body.cpf,
      phone: require.body.phone,
      email: require.body.email,
    };

    try {
      const updatedClient = await Client.updateOne({ _id: id }, client);
      if (updatedClient.matchedCount === 0) {
        return response.status(204).json({ 
          error: "Cliente não encontrado..",
          message: error, 
        });
      }
      
      response.status(200).json(client);
      
    } catch (error) {
      response.status(500).json({ 
        error: "Registro falhou.",
        message: error,
      });
    }
  },

  async delete(require, response) {
    const id = require.params.id;

    try {
      const client = await Client.findOne({ _id: id });
      if (!client) {
        return response.status(204).json({ 
          error: "Cliente não encontrado..",
          message: error, 
        });
      }

      await Client.deleteOne({ _id: id });
      response.status(200).json({ 
        message: "Cliente deletado com sucesso." 
      });
    
    } catch (error) {
      response.status(500).json({ 
        error: "Registro falhou.",
        message: error,
      });
    }
  },
};


module.exports.ClientController = ClientController;
