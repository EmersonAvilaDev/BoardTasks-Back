const express = require("express");
const connectDataBase = require("../middlewares/connectDB");
const handleExpectedErros = require("../functions/handleExpectedErrors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserSchema = require("../models/usuario");
const router = express.Router();

/* GET users listing. */
router.post("/criar", connectDataBase, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { nome, email, senha } = req.body;

    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD = await UserSchema.create({
      nome,
      email,
      senha: senhaHash,
    });

    res.status(200).json({
      status: "OK",
      statusMessage: "Usuário criado com sucesso.",
      response: respostaBD,
    });
  } catch (error) {
    if (String(err).includes("email_1 dup key")) {
      return handleExpectedErros(
        res,
        "Error: Já existe uma conta com esse email!"
      );
    }
    return handleExpectedErros(res, error);
  }
});

router.post("/logar", connectDataBase, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { email, senha } = req.body;

    let respostaBD = await UserSchema.findOne({ email }).select(`+senha`);
    if (respostaBD) {
      let senhaCorreta = await bcrypt.compare(senha, respostaBD.senha);
      if (senhaCorreta) {
        let token = jwt.sign({ id: respostaBD._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.header("x-auth-token", token);
        res.status(200).json({
          status: "OK",
          statusMessage: "Usuário autenticado com sucesso.",
          response: { "x-auth-token": token },
        });
      } else {
        throw new Error("Email ou senha incorreta");
      }
    } else {
      throw new Error("Email ou senha incorreta");
    }
  } catch (err) {
    return handleExpectedErros(res, err);
  }
});

module.exports = router;
