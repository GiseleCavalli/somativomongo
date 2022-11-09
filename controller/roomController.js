
const Room = require("../schemas/roomSchema");

const RoomController = {

  async listAll(_, response, next) {
    try {
      const rooms = await Room.find();
      response.status(200).json(rooms);
      // return response.jason(rooms);

    } catch (error) {
        return response.status(500).send({
          error: "Registro falhou.",
          message: error,
      })
    }
  },

  async create(require, response, next) {
    const room = new Room({
      type: require.body.type,
      number: require.body.number,
      adapted: require.body.adapted,
      hotel: require.body.hotel,
    });

    room.save((error, _) => {
      if (error) {
        return response.status(400).send({
          error: "Erro ao criar quarto",
          message: error,
        });
      }

      return response.status(200).send({
        message: "Quarto criado com sucesso.",
      });
    });
  },

  async getById(require, response, next) {
    const id = require.params.id;

    try {
      const room = await Room.findOne({ _id: id });
      response.status(200).json(room);

    } catch (err) {
      response.status(400).json({ 
        message: "Erro ao criar quarto",
        error: err,
      });
    }
  },

  async update(require, response, next) {
    const id = require.params.id;

    const room = {
      type: require.body.type,
      number: require.body.number,
      adapted: require.body.adapted,
      hotel: require.body.hotel,
    };

    try {
      const updatedRoom = await Room.updateOne({ _id: id }, room);
      
      if (updatedRoom.matchedCount === 0) {
        return response.status(204).json({ 
          error: "Quarto não encontrado.",
          message: error, 
        });
      }

      response.status(200).json(room);

    } catch (error) {
      response.status(500).json({ 
        message: "Registro falhou.",
        error: error,
      });
    }
  },

  async delete(require, response, next) {
    const id = require.params.id;

    try {
      const room = await Room.findOne({ _id: id });
      
      if (!room) {
        return response.status(204).json({ 
          message: "Quarto não encontrado.",
          error: error, 
        });
      }
      
      await Room.deleteOne({ _id: id });
      response.status(200).json({ 
        message: "Quarto deletado." 
      });
    
    } catch (error) {
      response.status(500).json({ 
        message: "Registro falhou.",
        error: error,  
      });
    }
  },
};

module.exports.RoomController = RoomController;
