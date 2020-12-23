import Logout from "./Logout";
import HelloUser from "./HelloUser";
import Navigator from "./Navigator";
import { useState } from "react";
function Header(props){
    const [navItems] = useState([
        {name:'Home',path:'/home'},
        {name:'About',path:'/about'},
        {name:'Users',path:'/users'}
    ]);
    return (
        <div className="srHeader">
            <div className="titleBox">
                <h1>{props.title}</h1>
                <div className="userInfo">
                    <HelloUser></HelloUser>
                    <Logout></Logout>
                </div>
            </div>    
            <Navigator navItems={navItems}></Navigator>       
        </div>
    );
}

export default Header;