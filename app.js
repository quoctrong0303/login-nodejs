const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const port = 3002;
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

// Export the Express API
module.exports = app;
