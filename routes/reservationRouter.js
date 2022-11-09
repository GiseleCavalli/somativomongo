
const router = require("express").Router();
const { ReservationController } = require("../controller/reservationController");

router.post("/", ReservationController.create);
router.get("/", ReservationController.listAll);
router.get("/:id", ReservationController.getById);

router.get("/room/:room", ReservationController.getByRoom);
router.get("/client/:client", ReservationController.getByClient);
router.get("/employee/:employee", ReservationController.getByEmployee);

router.patch("/:id", ReservationController.update);
router.delete("/:id", ReservationController.delete);

module.exports = router;
