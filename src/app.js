
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const urlMongo = "mongodb://localhost/somativomongo"

app.use(express.urlencoded({extended: true,}));
app.use(express.json());

const clientRouter = require("../routes/clientRouter");
const employeeRouter = require("../routes/employeeRouter");
const reservationRouter = require("../routes/reservationRouter");
const roomRouter = require("../routes/roomRouter");

app.use("/client", clientRouter);
app.use("/employee", employeeRouter);
app.use("/reservation", reservationRouter);
app.use("/room", roomRouter);

app.use((req, res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
      erro: {
          mensagem: error.message
      }
  });
});

mongoose.connect(urlMongo).then(() => {
  app.listen(3000);
}).catch((err) => console.log(err));
