import useToken from '../hooks/useToken';
import iamService from '../services/iamService';
export default function Logout(){
    const {token} = useToken();


    function doLogout(){
        alert('logout');
    }

    if(!token){
        return (
            <></>
        )
    }else{
        return (
            <div>
                <span className="logoutBtn" onClick={doLogout}>Logout</span>
            </div>
        )
    }
}