
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    type: {
        type: String,
        enum: ["Solteiro", "Casal", "Família", "Presidencial" ],
        required: [true, "Tipo de quarto não informado."],
    },
    number: {
        type: Number,
        required: [true, "Número não informado."],
    },
    adapted: {
        type: Boolean,
        default: false,
    },
    hotel: {
        type: Number,
    },
});

module.exports = mongoose.model("Room", roomSchema);