const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3002;
const api = require("./helper/index");
const app = express();
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (request, response) => {
    const key = request.header("key");
    //kiem tra key, neu hop le
    if (key === "quoctrong0303") {
        response.send({
            message: "Node.js and Express REST API",
            key: key,
        });
    } else {
        response.send({
            message: "fnck you!",
        });
    }
});

app.post("/quest-status", async (request, response) => {
    let res = await api.available(request.body);

    response.send(res);
});

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

// Export the Express API
module.exports = app;
