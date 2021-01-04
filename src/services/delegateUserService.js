import axios from 'axios';

const getDelegatedCompanies = function(email){
    
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_TOOL_AUTH_URL + `/delegators/${email}/companies`,
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
    getDelegatedCompanies
}
