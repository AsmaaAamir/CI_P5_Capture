import React from "react";
import { Container,  Nav, Navbar } from "react-bootstrap";
import logo from '../../src/assets/new_logo.png';
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
        <Nav.Link to="/">
            <Navbar.Brand>
                <img src={logo} alt="logo" height="85"/>
            </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
                <Nav.Link to="/" className={styles.NavLink} activeClassName={styles.Active} >
                        <i class="fas fa-home">
                            Home
                        </i> 
                    </Nav.Link>
                    <Nav.Link exact to="/feed" className={styles.NavLink} activeClassName={styles.Active} >
                        <i class="fas fa-images">
                            Feed
                        </i>
                    </Nav.Link>
                    <Nav.Link exact to="/addpost" className={styles.NavLink} activeClassName={styles.Active} >
                        <i class="fas fa-plus-square">
                            Add Post
                        </i>
                    </Nav.Link>
                    <Nav.Link exact to="/profile" className={styles.NavLink} activeClassName={styles.Active} >
                        <i class="fas fa-user">
                            Profile
                        </i>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default NavBar;