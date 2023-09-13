const { default: mongoose } = require("mongoose");
const mongooseToSwagger = require("mongoose-to-swagger");
const swaggerAutoGen = require("swagger-autogen")({
  openapi: "3.0.0",
  language: "pt-BR",
});

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../index.js", "../src/routes.js"];

let doc = {
  info: {
    version: "1.0.0",
    title: "API do BoardTasks",
    description: "Documentação da API do BoardTasks.",
  },
  servers: [
    {
      url: "http://localhost:4000/",
      description: "Servidor localhost.",
    },
    {
      url: "https://boardtasks-bt-back.vercel.app/",
      description: "Servidor de Produção.",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
};

swaggerAutoGen(outputFile, endpointsFiles, doc).then(() => {
  console.log(
    "Documentação do Swagger gerada encontra-se no arquivo em: " + outputFile
  );
  if (process.env.NODE_ENV !== "production") {
    require("../index.js");
  }
});
