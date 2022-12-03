const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3002;
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/", (request, response) => {
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

app.use("/login", async (request, response) => {
    let accounts = request.body;
    for (account of accounts) {
        //khong nen xai forEach voi await async vi no se khong doi, nen xai nhu the nay
        if (account.isFirebaseAuth) {
            let res = await api.firebaseAuth(account);
            account.idToken = res.data.idToken;
            res = await api.me(account.idToken);
            account.id = res.data.id;
        } else {
            let res = await api.signInWithEmailAndPassword(account);
            account.idToken = res.data.idToken;
            res = await api.me(account.idToken);
            account.id = res.data.id;
        }
    }

    response.send(accounts);
});

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

// Export the Express API
module.exports = app;
