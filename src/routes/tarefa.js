const express = require("express");
const connectDataBase = require("../middlewares/connectDB");
const handleExpectedErros = require("../functions/handleExpectedErrors");
const taskSchema = require("../models/tarefa");
const authUser = require("../middlewares/authUser");
const router = express.Router();

/* GET users listing. */
router.post("/criar", authUser, connectDataBase, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const usuarioCriador = req.usuarioJwt.id;
    const respostaBD = await taskSchema.create({
      posicao,
      titulo,
      descricao,
      status,
      dataEntrega,
      usuarioCriador,
    });

    res.status(200).json({
      status: "OK",
      statusMessage: "Tarefa criada com sucesso.",
      response: respostaBD,
    });
  } catch (error) {
    return handleExpectedErros(res, error);
  }
});

module.exports = router;
