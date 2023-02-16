import './NavbarBottom.css'
import * as GoIcons from "react-icons/go";
import { NavLink } from 'react-router-dom';

const NavbarBottom = () => {

    return (
        <nav className='navbarBottom' >
            {/* <h1>TEST</h1> */}
            <NavLink to="/Home"><GoIcons.GoHome className='navbarIcon' /> </NavLink>
            <NavLink to="/Search"><GoIcons.GoSearch className='navbarIcon' /></NavLink>
            <NavLink to="/Newpost"><GoIcons.GoDiffAdded className='navbarIcon' /></NavLink>
            <NavLink to="/Profile"><GoIcons.GoPerson className='navbarIcon' /></NavLink>
        </nav>
    );
}

export default NavbarBottom;