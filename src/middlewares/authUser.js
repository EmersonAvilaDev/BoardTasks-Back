const jwt = require("jsonwebtoken");
const handleExpectedErros = require("../functions/handleExpectedErrors");

const authUser = async (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return handleExpectedErros(
      res,
      new Error("Token na autenticação não fornecido")
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuarioJwt = decoded;
    next();
    
  } catch (error) {
    console.error(error);
    return handleExpectedErros(res, new Error("Token inválido"));
  }
};

module.exports = authUser;