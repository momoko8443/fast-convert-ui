import { useEffect } from "react";
import useToken from "../hooks/useToken"

export default function HelloUser() {
    const {token} = useToken();
    function helloMessage(){
        return 'Welcome! ' + token.email.split('@')[0];
    }
    return (
        <div>
            <span>{helloMessage()}</span>
        </div>
    );
}