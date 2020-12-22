import {
    Link
} from "react-router-dom";

function Header(props){
    return (
        <div className="srHeader">
            <h2>{props.title}</h2>
            <div className="nav HBox">
                <Link className="navItem" to="/">Home</Link>
                <Link className="navItem" to="/about">About</Link>
                <Link className="navItem" to="/users">Users</Link>
            </div>           
        </div>
    );
}

export default Header;