import axios from 'axios';

const getAllRequests = function(email){
    
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_SCRAPY_API_URL + '/allrequests',
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
    getAllRequests
}
