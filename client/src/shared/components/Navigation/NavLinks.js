import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css'

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return <ul className = "nav-links">
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/assessment" exact>Assessment</NavLink>
        </li>
        <li>
            <NavLink to="/awarness" exact>Awarness</NavLink>
        </li>
        <li>
            <NavLink to="/aboutUs" exact>AboutUs</NavLink>
        </li>
        <li>
            <NavLink to="/contactUs" exact>Contact Us</NavLink>
        </li>
        {auth.isLoggedIn && (<li>
            <Dropdown classname = "dropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic"> 
                    vanita
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item style={{ color: '#292929' }}><Link  to="/dashboard" exact>Dashboard</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/settings" exact>Settings</Link></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </li>)}
        {!auth.isLoggedIn &&(<li>
            <NavLink to="/auth" exact>Login</NavLink>
        </li>)}
       
        {auth.isLoggedIn && (
            <li>
                <button onClick={auth.logout}>LOGOUT</button>
            </li>
        )}
    </ul>
};

export default NavLinks;


/*  */