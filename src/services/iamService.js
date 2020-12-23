import axios from 'axios'

const loginURL = function() {
    var iamUrl = process.env.REACT_APP_IAM_URL;
    iamUrl += "?client_id=";
    iamUrl += process.env.REACT_APP_IAM_CLIENT_ID;
    iamUrl += "&redirect_uri=";
    iamUrl += process.env.REACT_APP_IAM_REDIRECT_URI;
    iamUrl += "&response_type=";
    iamUrl += process.env.REACT_APP_IAM_RESPONSE_TYPE;

    console.info("redirect to iam service url=" + iamUrl);
    //window.location.href = iamUrl;
    return iamUrl;
}

const logout = function(access_token) {
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_TOOL_AUTH_URL+ '/logout',
            method: 'GET',
            headers: {
                "X-Access-Token": "Bearer " + access_token,
                "content-type": "application/json",
                "accept": "*/*",
                "x-requested-with": "XMLHttpRequest"
            }
        }).then(function (result) {
            resolve()
        }).catch(error => {
            console.warn('logout error: ', error)
            resolve()
        })
    })
}

const checkToken = function(access_token) {
    return new Promise((resolve, reject) => {
        axios.request({
            url: process.env.REACT_APP_TOOL_AUTH_URL + '/user_info',
            method: 'get',
            headers: {
                "Authorization": "Serai " + access_token,
                "content-type": "application/json",
                "accept": "*/*"
            }
        }).then(function(result) {
            if (result && (result.status === 200 || result.status === 201) ) {
                resolve(result)
            } else {
                throw result;
            }
        }).catch(function(e) {
            reject(e);
        });
    })
}

export default {
    loginURL,
    logout,
    checkToken
}
