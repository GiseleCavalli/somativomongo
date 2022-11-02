
const router = require("express").Router();
const { ReservationController } = require("../controller/reservationController");

router.post("/", ReservationController.create);
router.get("/", ReservationController.listAll);
router.get("/:id", ReservationController.getById);
router.patch("/:id", ReservationController.update);
router.delete("/:id", ReservationController.delete);

module.exports = router;
