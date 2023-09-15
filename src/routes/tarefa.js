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

router.put("/editar/:id", authUser, connectDataBase, async function (req, res) {
  try {
    // #swagger.tags = ['Tarefa']
    let idTarefa = req.params.id;
    let { posicao, titulo, descricao, status, dataEntrega } = req.body;
    const usuarioLogado = req.usuarioJwt.id;
    const checkTarefa = await taskSchema.findOne({
      _id: idTarefa,
      usuarioCriador: usuarioLogado,
    });
    if (!checkTarefa) {
      throw new Error("Tarefa não encontrada ou pertence a outro usuário");
    }

    const tarefaAtualizada = await taskSchema.updateOne(
      { _id: idTarefa },
      {
        posicao,
        titulo,
        descricao,
        status,
        dataEntrega,
      }
    );
    if (tarefaAtualizada?.modifiedCount > 0) {
      const dadosTarefa = await taskSchema
        .findOne({ _id: idTarefa })
        .populate("usuarioCriador");

      res.status(200).json({
        status: "OK",
        statusMessage: "Tarefa atualizada com sucesso.",
        response: dadosTarefa,
      });
    }
  } catch (error) {
    return handleExpectedErros(res, error);
  }
});

router.get(
  "/obter/usuario",
  authUser,
  connectDataBase,
  async function (req, res) {
    try {
      // #swagger.tags = ['Tarefa']
      // #swagger.description = "Endpoint para obter todas as tarefas do usuário logado."

      const usuarioLogado = req.usuarioJwt.id;
      const respostaBD = await taskSchema.find({
        usuarioCriador: usuarioLogado,
      }).populate("usuarioCriador");

      res.status(200).json({
        status: "OK",
        statusMessage: "Tarefas listadas com sucesso.",
        response: respostaBD,
      });
    } catch (error) {
      return handleExpectedErros(res, error);
    }
  }
);

module.exports = router;
