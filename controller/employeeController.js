
const Employee = require("../schemas/employeeSchema");

const EmployeeController = {
  async listAll(_, response, next) {
    try {
      const employees = await Employee.find();
      response.status(200).json(employees);

    } catch (error) {
      response.status(500).json({ 
        error: "Registro falhou.",
        message: error,
      });
    }
  },

  async create(require, response, next) {
    
    const employee = new Employee({
      name: require.body.name,
      jobPosition: require.body.jobPosition,
    });

    employee.save((error, _) => {
      if (error) {
        return response.status(204).send({
          error: "Funcionário não encontrado.",
          message: error,
        });
      }

      return response.status(200).send({
        message: "Funcionário criado com sucesso.",
      });
    });
  },

  async getById(require, response, next) {
    const id = require.params.id;

    try {
      const employee = await Employee.findOne({ _id: id });
      response.status(200).json(employee);

    } catch (err) {
      response.status(404).json({ 
        message: "Funcionário não encontrado..",
        error: err,
      });
    }
  },

  async update(require, response) {
    const id = require.params.id;

    const employee = {
      name: require.body.name,
      jobPosition: require.body.jobPosition,
    };

    try {
      const updatedEmployee = await Employee.updateOne({ _id: id }, employee);
      
      if (updatedEmployee.matchedCount === 0) {
        return response.status(204).json({ 
          error: "Funcionário não encontrado.",
          message: error,
        });
      }

      response.status(200).json(employee);
    
    } catch (error) {
      response.status(500).json({ 
        error: "Registro falhou.",
        message: error,
      });
    }
  },

  async delete(require, response, next) {
    const id = require.params.id;

    try {
      const employee = await Employee.findOne({ _id: id });
      
      if (!employee) {
        return response.status(204).json({ 
          error: "Funcionário não encontrado.",
          message: error, 
        });
      }
      
      await Employee.deleteOne({ _id: id });
      response.status(200).json({ 
        message: "Funcionário deletado com sucesso." 
      });
    
    } catch (error) {
      response.status(500).json({ 
        error: "Registro falhou.",
        message: error,
      });
    }
  },
};

module.exports.EmployeeController = EmployeeController;
