const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: `é obrigatório!`,
    },
    email: {
      type: String,
      unique: true,
      required: `é obrigatório!`,
      lowercase: true,
      index: true,
      validate: {
        validator: (valorDigitado) => {
          return validator.isEmail(valorDigitado);
        },
        message: "inválido!",
      },
    },
    password: {
      type: String,
      required: `é obrigatório!`,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserSchema = mongoose.models.Usuario || mongoose.model("Usuario", schema);
module.exports = UserSchema;
