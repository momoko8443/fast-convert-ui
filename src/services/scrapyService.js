import axios from 'axios';

const getAllRequests = function(){
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_TOOL_AUTH_URL + '/spider/requests',
            method: 'get',
            headers: {
                "content-type": "application/json",
                "accept": "*/*"
            }
        }).then( (result)=> {
            resolve(result.data)
        }).catch(error => {
            reject(error)
        })
    })
}

const getPagesByDomain = function(domain){
    
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_TOOL_AUTH_URL + `/spider/requests/${domain}`,
            method: 'get',
            headers: {
                "content-type": "application/json",
                "accept": "*/*"
            }
        }).then( (result)=> {
            resolve(result.data)
        }).catch(error => {
            reject(error)
        })
    })
}

const getElementsByPage = function(page){
    
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_TOOL_AUTH_URL + `/spider/pages/${page}`,
            method: 'get',
            headers: {
                "content-type": "application/json",
                "accept": "*/*"
            }
        }).then( (result)=> {
            resolve(result.data)
        }).catch(error => {
            reject(error)
        })
    })
}
export default {
    getAllRequests,
    getPagesByDomain,
    getElementsByPage
}
