const { default: axios } = require("axios");
const config = {
    headers: {
        Accept: "application/json",
        "Accept-Encoding": "identity",
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
    available: async (token) => {
        config.headers.Authorization = "Bearer " + token;
        let res = await axios.get(
            "https://api-core.wolvesville.com/clanQuests/available",
            config
        );
        return res;
    },
    claim: async (token, clanId, questId) => {
        config.headers.Authorization = "Bearer " + token;
        let res = await axios.post("", config);
        return res;
    },
    skipWaiting: async (token, clanId) => {
        config.headers.Authorization = "Bearer " + token;
        let res = await axios.post("", config);
        return res;
    },
};
