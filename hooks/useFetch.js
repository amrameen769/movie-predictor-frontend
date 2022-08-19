export default async function useFetch(url, method, token = null, reqData = null) {

    const axios = require("axios").default
    let data = null
    let headers = {
        'Access-Control-Allow-Origin': '*',
    }

    if (token !== null) {
        headers = {"Authorization": "Bearer " + token}
    }
    if (method === "post" && reqData !== null) {
        await axios({
            url: url,
            method: method,
            headers,
            data: reqData
        }).then(async function (response) {
            data = await response.data
        })
    }
    if (method === "get") {
        await axios({
            url: url,
            method: method,
            headers: {
                ...headers,
                'Access-Control-Allow-Origin': '*'
            },
        }).then(async function (response) {
            data = await response.data
        })
    }

    if (data !== null) return data;
    else return false
}