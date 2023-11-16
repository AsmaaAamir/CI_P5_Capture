import React from "react";
import { NavLink } from "react-router-dom";
import styles from '../styles/WelcomePage.module.css';
import welcome from '../assets/p5-welcomepage.png';
import btnStyles from "../styles/Button.module.css";
import { Button } from "react-bootstrap";


/* Welcome page wih option to sign in and sign up */

const Welcomepage = () => {
    return (
        <div className={styles.Container}>
           <div className="row">
                <div class="col-md-8">
                    <img class="img-fluid" src={welcome} alt="travle shots collage"/>
                </div>
                <div class="col-md-4">
                    <div className={styles.WelcomeText}>
                        <h1>Welcome</h1>
                        <p>
                            Capture the moments and share it with your loved one and the world. Become the next inspiration for someone..!
                        </p>
                    </div>
                    <div className={styles.WelcomeButton}>
                        <NavLink exact to="/signin" >
                            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Colour}`} type="submit">Sign In </Button>
                        </NavLink>
                        <NavLink exact to="/signup" >
                            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Colour}`} type="submit">Sign Up </Button>
                        </NavLink>
                    </div>
                </div>
           </div>
        </div>
    );
};


export default Welcomepage;
