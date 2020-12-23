import useToken from '../hooks/useToken';
import iamService from '../services/iamService';
export default function Logout(){
    const {token,setToken} = useToken();


    function doLogout(){
        //alert('logout');
        iamService.logout(token.access_token).then((result)=>{
            setToken('');
            window.location.href = '/';
        });
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