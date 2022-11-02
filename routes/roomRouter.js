
const router = require("express").Router();
const { RoomController } = require("../controller/roomController");

router.post("/", RoomController.create);
router.get("/", RoomController.listAll);
router.get("/:id", RoomController.getById);
router.patch("/:id", RoomController.update);
router.delete("/:id", RoomController.delete);

module.exports = router;
