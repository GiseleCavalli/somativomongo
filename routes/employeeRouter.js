
const router = require("express").Router();
const { EmployeeController } = require("../controller/employeeController");

router.post("/", EmployeeController.create);
router.get("/", EmployeeController.listAll);
router.get("/:id", EmployeeController.getById);
router.patch("/:id", EmployeeController.update);
router.delete("/:id", EmployeeController.delete);

module.exports = router;
