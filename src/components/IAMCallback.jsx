import { useEffect, useState } from "react"
import jwtUtil from '../utils/jwtUtil';
import iamService from '../services/iamService';
import useToken from '../hooks/useToken';

export default function IAMCallback(){
    const _hash = window.location.hash;
    const [hash] = useState(_hash);

    const {token,setToken} = useToken();
    useEffect(()=>{
        const accessToken = jwtUtil.encode(hash);
        console.log(accessToken);
        iamService.checkToken(accessToken).then((res)=>{
            setToken(res.data);
            window.location.href = "/";
        }).catch((error)=>{
            console.error(error);
        })
    });

    return (
        <div>
            
        </div>
    )
}