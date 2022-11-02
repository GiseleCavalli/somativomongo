
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    data: {
      type: Date,
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Quarto não encontrado."],
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Funcionário não encontrado."],
    },
    consumption: {
      type: Number,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Cliente não encontrado."],
    },
});

module.exports = mongoose.model("Reservation", reservationSchema);