import {
    Link
} from "react-router-dom";
import Logout from "./Logout";

function Header(props){
    return (
        <div className="srHeader">
            <div className="titleBox">
                <h2>{props.title}</h2>
                <Logout></Logout>
            </div>
            <div className="nav HBox">
                <Link className="navItem" to="/">Home</Link>
                <Link className="navItem" to="/about">About</Link>
                <Link className="navItem" to="/users">Users</Link>
            </div>
                       
        </div>
    );
}

export default Header;