import React from "react";
import { Container,  Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from '../../src/assets/new_logo.png';
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
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
                <NavLink to="/" className={styles.NavLink} activeClassnAME={styles.Active} >
                        <i class="fas fa-home">
                            Home
                        </i> 
                    </NavLink>
                    <NavLink exact to="/feed" className={styles.NavLink} activeClassnAME={styles.Active} >
                        <i class="fas fa-images">
                            Feed
                        </i>
                    </NavLink>
                    <NavLink exact to="/addpost" className={styles.NavLink} activeClassnAME={styles.Active} >
                        <i class="fas fa-plus-square">
                            Add Post
                        </i>
                    </NavLink>
                    <NavLink exact to="/profile" className={styles.NavLink} activeClassnAME={styles.Active} >
                        <i class="fas fa-user">
                            Profile
                        </i>
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default NavBar;