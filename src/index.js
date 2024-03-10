const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/server-config");

const app = express();

const StartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, async () => {
        console.log(`server is running at port ${PORT}`);
    })
}

StartServer();