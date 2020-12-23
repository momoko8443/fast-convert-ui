import { useState } from 'react';

export default function useToken(){
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };
    const [token,setToken] = useState();

    const saveToken = userToken => {
        if(userToken){
            sessionStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken);
        }else{
            sessionStorage.removeItem('token');
        }
    };

    return {
        setToken: saveToken,
        token: getToken()
    }
}