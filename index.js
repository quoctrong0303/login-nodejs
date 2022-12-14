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

app.post("/login", async (request, response) => {
    let accounts = request.body;
    for (account of accounts) {
        //Xai dong` bo. login tung account la hop ly, vi api wolvesville se bi loi "too-many-request" neu nhu gui yeu cau cung luc cac request giong nhau
        //khong nen xai forEach voi await async vi no se khong doi. return, nen xai nhu the nay
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

app.post("/quest-status", async (request, response) => {
    //Lấy token từ body
    let res = await api
        .available(request.body.idToken)
        //Nếu fetch thành công
        .then((res) => {
            response.send(res.data);
        })
        //handle lỗi khi fetch
        .catch((err) => {
            response.send(JSON.stringify(err));
        });
});

app.post("/quest-claim", async (request, response) => {
    //Lấy token, questId từ body
    let res = await api
        .claim(request.body.idToken, request.body.questId)
        .then((res) => {
            response.send(res.data);
        })
        .catch((err) => {
            response.send(JSON.stringify(err));
        });
});

app.post("/quest-skip", async (request, response) => {
    //Lấy token từ body
    let res = await api
        .skipWaiting(request.body.idToken)
        .then((res) => {
            response.send(res.data);
        })
        .catch((err) => {
            response.send(JSON.stringify(err));
        });
});

app.post("/quest-active", async (request, response) => {
    //Lấy token từ body
    let res = await api
        .active(request.body.idToken)
        .then((res) => {
            response.send(res.data);
        })
        .catch((err) => {
            response.send(JSON.stringify(err));
        });
});

app.post("/inventory", async (request, response) => {
    //Lấy token từ body
    let res = await api
        .inventory(request.body.idToken)
        .then((res) => {
            response.send(res.data);
        })
        .catch((err) => {
            response.send(JSON.stringify(err));
        });
});

app.post("/donate-gold", async (request, response) => {
    //Lấy token từ body
    let res = await api
        .donateGold(request.body.idToken, request.body.gold)
        .then((res) => {
            response.send(res.data);
        })
        .catch((err) => {
            response.send(JSON.stringify(err));
        });
});

app.post("/lootbox", async (request, response) => {
    //Lấy token từ body
    let res = await api
        .openLootBox(request.body.idToken, request.body.id)
        .then((res) => {
            response.send(res.data);
        })
        .catch((err) => {
            response.send(JSON.stringify(err));
        });
});

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

// Export the Express API
module.exports = app;
