const S = require("string");

const handleExpectedErros = (res, err) => {
  //Entra quando o mongoose der algum erro
  if (String(err).includes("VadationError:")) {
    return res.status(400).json({
      status: "Error",
      statusMessage: S(String(err).replace("Validation: ", "")).replaceAll(
        ":",
        ""
      ).s,
      response: String(err),
    });
  }
  //Pode ser um erro definido manualmente por mim
  if (String(err).includes(`Error:`)) {
    return res.status(400).json({
      status: "Erro",
      statusMessage: String(err).replace("Error: ", ""),
      response: String(err),
    });
  }

  //Erro inesperado
  console.log(err);
  return res.status(500).json({
    status: "Erro",
    statusMessage: "Houve um problema inesperado, tente novamente mais tarde.",
    response: String(err),
  });
};

module.exports = handleExpectedErros;
