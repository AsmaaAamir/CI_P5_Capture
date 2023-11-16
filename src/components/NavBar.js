import React from "react";
import { Container,  Nav, Navbar } from "react-bootstrap";
import logo from '../../src/assets/new_logo.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../App";

const NavBar = () => {
    const currentUser = useContext(CurrentUserContext)
    const loggedOutMenu = (
        <>
            <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active} >
               <i class="fas fa-sign-in-alt">
                    Sign In
                </i>
            </NavLink>
            <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active} >
                <i class="fas fa-user-plus">
                    Sign Up
                </i> 
            </NavLink>
        </> 
    );
    const loggedInMenu = <> {currentUser?.username} 
        
        </>


    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="85"/>
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink to="/" className={styles.NavLink} activeClassName={styles.Active} >
                        <i class="fas fa-home">
                            Home
                        </i> 
                    </NavLink>
                   {currentUser ? loggedInMenu : loggedOutMenu}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default NavBar;