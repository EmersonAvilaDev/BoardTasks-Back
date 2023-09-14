const mongoose = require("mongoose");
const handleExpectedErros = require("../functions/handleExpectedErrors");

const connectDataBase = async (req = null, res = null, next = null) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado ao banco de dados!`);
    try {
      next();
    } catch {}
    return mongoose;
  } catch (error) {
    console.log(error);
    handleExpectedErros(res, "Error: Erro ao conectar no banco de dados")
    return error;
  }
};

module.exports = connectDataBase;