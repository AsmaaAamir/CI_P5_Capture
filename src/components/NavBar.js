import React from "react";
import { Container,  Nav, Navbar } from "react-bootstrap";
import logo from '../../src/assets/new_logo.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser, } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";


const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref} = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const addPost = (
        <NavLink to="/addpost" className={styles.NavLink} activeClassName={styles.Active} >
            <i class="fas fa-plus-square">
                Add Post
            </i>
        </NavLink>
    );

    const loggedInMenu = (
        <>
            <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.NavLink} >
                <Avatar src={currentUser?.profile_image} height={45} />
            </NavLink>
            <NavLink to="/feed" className={styles.NavLink} activeClassName={styles.Active} >
                <i class="fas fa-images">
                    Feed
                </i>
            </NavLink>
            <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
                <i class="fas fa-sign-out-alt">
                    Sign Out
                </i>
            </NavLink>
        </> 
    );

    const loggedOutMenu = (
            <>
                <NavLink to="/" className={styles.NavLink} activeClassName={styles.Active} >
                    <i class="fas fa-home">
                        Home
                    </i> 
                </NavLink>
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

    return (
        <Navbar  expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
        <Container>
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="85"/>
                </Navbar.Brand>
            </NavLink>
            {currentUser && addPost}
            <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">

                   {currentUser ? loggedInMenu : loggedOutMenu}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
};

export default NavBar;