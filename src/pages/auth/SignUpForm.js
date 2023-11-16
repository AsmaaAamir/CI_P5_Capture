import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUp.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { Form, Button, Col, Row, Container, Alert, } from "react-bootstrap";
import axios from "axios";


const SignUpForm = () => {
    const [signUpData, setSignUpData ] = useState ({
        username: '',
        password1: '',
        password2: '',
    });

    const  { username, password1, password2 } = signUpData;
        
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData, 
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try { 
            await axios.post('/dj-rest-auth/registration/', signUpData);
            history.push("/signin"); 
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.Form}>
            <Row className={styles.Row}>
                <Col className="my-auto py-4 p-md-4" md={10}>
                    <Container className={`${appStyles.Body} p-4`}>
                        <h1 className={styles.Header}>Sign Up</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label className="d-none">Username:</Form.Label>
                                <Form.Control 
                                    className={styles.Input}
                                    type="text" 
                                    placeholder="Username" 
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {errors.username?.map((message, idx) => (
                                <Alert variant="warning" key={idx} >
                                    {message}
                                </Alert>
                            ))}   
                            <Form.Group controlId="password1">
                                <Form.Label className="d-none">Password</Form.Label>
                                <Form.Control 
                                    className={styles.Input}
                                    type="password" 
                                    placeholder="Password"
                                    name="password1"
                                    value={password1}
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            {errors.password1?.map((message, idx) => (
                                <Alert variant="warning" key={idx} >
                                    {message}
                                </Alert>
                            ))}
                            <Form.Group controlId="password2">
                                <Form.Label className="d-none"> Confrim Password</Form.Label>
                                <Form.Control 
                                    className={styles.Input}
                                    type="password" 
                                    placeholder="Confrim Password"
                                    name="password2"
                                    value={password2}
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                            {errors.password2?.map((message, idx) => (
                                <Alert variant="warning" key={idx} >
                                    {message}
                                </Alert>
                            ))}
                        <Button className={`${btnStyles.Button} ${btnStyles.Width} ${btnStyles.Colour}`} type="submit">
                            Sign Up
                        </Button>
                        {errors.non_field_errors?.map((message, idx) =>( 
                        <Alert key={idx} variant="warning" className="mt-3">
                            {message}
                        </Alert>
                        ))}
                        </Form>
                    </Container>
                    <Container className={`mt-3 ${appStyles.Content}`}>
                            <Link className={styles.Link} to="/signin">
                            <p> Already have an account <span>Sign In</span></p>
                        </Link>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;