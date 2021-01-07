import axios from 'axios';
const analyse = function(url) {
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_TOOL_AUTH_URL + '/analyse',
            method: 'get',
            params:{
                'from':url
            },
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

const uploadImages = function(images,companyId,showCaseType) {
    return new Promise(function (resolve, reject) {
        axios({
            url: process.env.REACT_APP_TOOL_AUTH_URL + '/images2',
            method: 'post',
            data:{
                'images':images,
                'companyId':companyId,
                'showCaseType':showCaseType
            },
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
    analyse,
    uploadImages
}
