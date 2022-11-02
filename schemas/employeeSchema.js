
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nome não informado."],
  },
  jobPosition: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);