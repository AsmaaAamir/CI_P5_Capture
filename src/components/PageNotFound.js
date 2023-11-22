import React from "react";
import { Link } from "react-router-dom";
import styles from "../App.module.css";
import {Row, Col, Button } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";

/* Displaying a 404 customised pages for user, with a 
link to retune the home page */

const PageNotFound = () =>{
    return (
        <Row>
            <Col className="py-6 mx-auto text-center" md={12}>
                <h1 className={styles.FontH1}> Sorry this page is not available</h1>
                 <Link to="/">
                    <Button className={`${btnStyles.Button}`}>
                        <i class="fas fa-home"></i>
                    </Button>
                </Link>
            </Col >
        </Row>
    );
}

export default PageNotFound;