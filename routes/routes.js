const api = require("../helper/index");
const router = (app) => {
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
};

const users = [
    {
        id: 1,
        name: "Richard Hendricks",
        email: "richard@piedpiper.com",
    },
    {
        id: 2,
        name: "Bertram Gilfoyle",
        email: "gilfoyle@piedpiper.com",
    },
];

module.exports = router;
