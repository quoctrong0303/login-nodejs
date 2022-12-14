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
        let res = await axios.get(
            "https://api-core.wolvesville.com/clanQuests/available",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        return res;
    },
    inventory: async (token) => {
        let res = await axios.get(
            "https://api-core.wolvesville.com/inventory",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        return res;
    },
    claim: async (token, questId) => {
        let res = await axios.post(
            `https://api-core.wolvesville.com/clanQuests/claim?questId=${questId}&&claimGoldQuestWithGems=false`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        return res;
    },
    donateGold: async (token, gold) => {
        let res = await axios.post(
            `https://api-core.wolvesville.com/clans/gold/donate?gold=${gold}`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        return res;
    },
    skipWaiting: async (token) => {
        let res = await axios.post(
            "https://api-core.wolvesville.com/clanQuests/skipWaitingTime",
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        return res;
    },
    active: async (token) => {
        let res = await axios.get(
            "https://api-core.wolvesville.com/clanQuests/active",
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        return res;
    },
};
