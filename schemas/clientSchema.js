
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome não informado."],
  },
  address: {
    type: String,
    required: [true, "Endereço não informado."],
  },
  nationality: {
    type: String,
    required: [true, "Nacionalidade não informada."],
  },
  email: {
    type: String,
    unique: [true, "E-mail já existe."],
    lowercase: true,
    trim: true,
    required: [true,
      "Campo e-mail é obrigatório.",
    ],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} não é um e-mail válido.",
    },
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\d{11}/.test(v);
      },
      message: "{VALUE} não é um telefone válido.",
    },
  },
});

module.exports = mongoose.model("Client", clientSchema);