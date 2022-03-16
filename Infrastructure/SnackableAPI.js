const axios = require("axios");

const host = "http://interview-api.snackable.ai/api/file";

const snackableAPI = {
    all: (offset = 5, limit = 5) => {
        return axios.get(`${host}/all?limit=${limit}&offset=${offset}`)
            .then(res => res.data);
    },
    details: (snackableFieldId) => {
        return axios.get(`${host}/details/${snackableFieldId}`)
            .then(res => res.data);
    },
    segments: (snackableFieldId) => {
        return axios.get(`${host}/segments/${snackableFieldId}`)
            .then(res => res.data);
    },
};


module.exports = snackableAPI;