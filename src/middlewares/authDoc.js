const authDocProducao = async (req, res, next) => {
  const { senha } = req.body;

  if (req.headers.host.includes("localhost") || req.originalUrl !== "/doc/") {
    //Usuário está no localhost
    return next();
  }

  if (senha === process.env.SWAGGER_SENHA_DOC) {
    //Usuário Digitou a senha corretamente
    return next();
  }

  if (senha) {
    //Usuário Digitou a senha incorretamente
    res.status(401).set("Content-Type", "text/html");
    res.send(
      Buffer.from(`
        <form method="post">
            <p style="color: red;">Senha Errada!</p>
            <label for="senha"> Senha da Documentação: </label> 
            <input type="password" name="senha" id="name" />
            <button type="submit">Entrar</button>
        </form>  
    `)
    );
  } else {
    //Usuário ainda não digitou a senha e está em modo produção
    res.status(200).set("Content-Type", "text/html");
    res.send(
      Buffer.from(`
        <form method="post">
            <label for="senha"> Senha da Documentação: </label> 
            <input type="password" name="senha" id="name" />
            <button type="submit">Entrar</button>
        </form>  
    `)
    );
  }
};

module.exports = authDocProducao;
