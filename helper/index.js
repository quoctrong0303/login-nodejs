const { default: axios } = require("axios");
const config = {
    headers: {
        Accept: "application/json",
        "Accept-Encoding": "identity",
        "Content-Type": "application/json",
        Authorization: BOT_KEY,
    },
};

module.exports = api = {
    firebaseAuth: async (payload) => {
        let res = await axios.post(
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCH9qHx3eLCfXqodcKKBshE9BKfTLAioRo",
            {
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            },
            config
        );
        return res;
    },
    signInWithEmailAndPassword: async (payload) => {
        let res = await axios.post(
            "https://api-auth.wolvesville.com/players/signInWithEmailAndPassword",
            {
                email: payload.email,
                password: payload.password,
            }
        );
        return res;
    },
    me: async (token) => {
        let res = await axios.get(
            "https://api-core.wolvesville.com/players/me",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        return res;
    },
    available: async (payload) => {
        console.log(payload);
        let result = await api.signInWithEmailAndPassword(payload);
        let token = result.data.idToken;
        config.headers.Authorization = "Bearer " + token;
        let res = await axios.get(
            "https://api-core.wolvesville.com/clanQuests/available",
            config
        );
        return res;
    },
};
