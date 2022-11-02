
const router = require("express").Router();
const { ClientController } = require("../controller/clientController");

router.post("/", ClientController.create);
router.get("/", ClientController.listAll);
router.get("/:id", ClientController.getById);
router.patch("/:id", ClientController.update);
router.delete("/:id", ClientController.delete);

module.exports = router;
