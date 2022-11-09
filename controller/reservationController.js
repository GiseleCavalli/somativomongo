const moment = require("moment");

const Reservation = require("../schemas/reservationSchema");
const Room = require("../schemas/roomSchema");

const ReservationController = {
  async listAll(_, response, next) {
    try {
      const reservations = await Reservation.find();
      response.status(200).json(reservations);

    } catch (error) {
      response.status(500).json({ 
        message: "Registro falhou.",
        error: error, 
      });
    }
  },

  async create(require, response, next) {
    const room = await Room.findOne({ _id: require.body.room_id });

    const reservation = new Reservation({
      data: require.body.data,
      canceled: require.body.canceled,
      room: require.body.room,
      employee: require.body.employee,
      consumption: require.body.consumption,
      client: require.body.client,
    });

    reservation.save((err, _) => {
      if (err) {
        return response.status(400).send({
          message: "Reservsa não realizada",
          error: err
        })
      }

      return response.status(200).send({
        message: "Reserva criada com sucesso.",
      });
    });
  },

  async getById(require, response, next) {
    const id = require.params.id;

    try {
      const reservation = await Reservation.findOne({ _id: id });
      response.status(200).json(reservation);
    
    } catch (err) {
      response.status(404).json({ 
        message: "Reserva não encontrada..",
        error: err, 
      });
    }
  },

  async getByClient(require, response, next) {
    const client = require.params.client;
    console.log(client)

    try {
      const reservation = await Reservation.findOne({ client: client });
      response.status(200).json(reservation);
    
    } catch (err) {
      response.status(404).json({ 
        message: "Reserva não encontradaaaaaaaaaaaaaa..",
        error: err, 
      });
    }
  },

  async getByEmployee(require, response, next) {
    const employee = require.params.employee;

    try {
      const reservation = await Reservation.findOne({ employee: employee });
      response.status(200).json(reservation);
    
    } catch (err) {
      response.status(404).json({ 
        message: "Reserva não encontrada..",
        error: err, 
      });
    }
  },
  async getByRoom(require, response, next) {
    const room = require.params.room;

    try {
      const reservation = await Reservation.findOne({ room: room });
      response.status(200).json(reservation);
    
    } catch (err) {
      response.status(404).json({ 
        message: "Reserva não encontrada..",
        error: err, 
      });
    }
  },

  async update(require, response, next) {
    const id = require.params.id;

    const reservation = {
      data: require.body.data,
      canceled: require.body.canceled,
      room: require.body.room,
      employee: require.body.employee,
      consumption: require.body.consumption,
      client: require.body.client,
    };

    try {
      const updatedReservation = await Reservation.updateOne(
        { _id: id },
        reservation
      );

      if (updatedReservation.matchedCount === 0) {
        return response.status(204).json({ 
          error: "Reserva não encontrada.",
          message: error,    
        });

      }
    
      response.status(200).json(reservation);
    
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
      const reservation = await Reservation.findOne({ _id: id });
      
      if (!reservation) {
        return response.status(204).json({ 
          message: "Reserva não encontrada.",
          error: error,  
        }); 
      }
      
      await Reservation.deleteOne({ _id: id });
      response.status(200).json({ 
        message: "Reserva deletada." 
    });
    
    } catch (error) {
      response.status(500).json({ 
        message: "Registro falhou.",
        error: error, 
      });
    }
  },
};

module.exports.ReservationController = ReservationController;
