const routes = (app) => {
    app.use("/usuario", require("./routes/usuario"));
    return;
}

module.exports = routes;