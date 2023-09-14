const express = require("express");
const connectDataBase = require("../middlewares/connectDB");
const handleExpectedErros = require("../functions/handleExpectedErrors");
const bcrypt = require("bcrypt");
const UserSchema = require("../models/usuario");
const router = express.Router();

/* GET users listing. */
router.post("/criar", connectDataBase, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario]
    let { nome, email, senha } = req.body;

    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash)
    const respostaBD = await UserSchema.create({nome, email, senha: senhaHash})

    res.status(200).json({
      status: "Ok",
      statusMessage: "Usuário criado com sucesso.",
      resonse: respostaBD
    })
  } catch (error) {
    if(String(err).includes("email_1 dup key")){
      return handleExpectedErros(res, "Error: Já existe uma conta com esse email!")
    }
    return handleExpectedErros(res, error);
  }
});

module.exports = router;
