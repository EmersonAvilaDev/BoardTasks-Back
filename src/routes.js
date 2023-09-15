const routes = (app) => {
    app.use("/usuario", require("./routes/usuario"));
    app.use("/tarefa", require("./routes/tarefa"));
    return;
}

module.exports = routes;