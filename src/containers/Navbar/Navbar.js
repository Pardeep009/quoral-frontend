import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import './Navbar.css';
import { isAuthenticated, signout } from '../../auth/index';

const Navbar = ({ history }) => {
    
    return (
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            
            <NavLink to="/" className="navbar-brand" activeClassName="active-link">Quoral</NavLink>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
                <ul className="navbar-nav">
                    {
                        !isAuthenticated() 
                        ? 
                            <>
                                <li className="nav-item">
                                    <NavLink to="/signin" className="nav-NavLink" activeClassName="active-link">Sign In</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/signup" className="nav-NavLink" activeClassName="active-link">Sign Up</NavLink>
                                </li>
                            </> 
                        :
                            <>
                                <li className="nav-item">
                                    <NavLink 
                                        to="#" 
                                        onClick={() => signout(() => history.push("/"))}
                                        className="nav-NavLink" 
                                        activeClassName="active-link" > Logout</NavLink>
                                </li>
                            </>
                    }
                </ul>
            </div>

        </nav>
    );

}


export default withRouter(Navbar);