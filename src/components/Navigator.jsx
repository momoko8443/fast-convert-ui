

import {
    Link
} from "react-router-dom";
export default function Navigator(props){

    const navList = props.navItems.map(nav =>
        <Link className="nav navItem" key={nav.path} to={nav.path}>{nav.name}</Link>
    )
    return(
        <div className="nav hbox">
            {navList}
        </div>
    );
}