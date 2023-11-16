import React, {useContext, useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
import styles from "../../styles/SignInUp.module.css";
import { Form, Button, Col, Row, Container, Alert, } from "react-bootstrap";
import { SetCurrentUserContext } from "../../App";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

function SignInForm() {
    const setCurrentUser = useContext(SetCurrentUserContext);

    const [signInData, setSignInData ] = useState ({
        username: '',
        password: '',

    });

    const  { username, password } = signInData;
    
    const [errors, setErrors] = useState({});

    const history = useHistory();

    const handleChange = (event) => {
        setSignInData({
            ...signInData, 
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try { 
            const {data} = await axios.post("/dj-rest-auth/login/", signInData);
            setCurrentUser(data.user);
            history.push("/"); 
        } catch (err){
            setErrors(err.response?.data);
        }
    };

    return (
        <Container className={styles.Form}>
        <Row className={styles.Row}>
            <Col className="my-auto py-4 p-md-4" md={10}>
                <Container className={`${appStyles.Body} p-4`}>
                    <h1 className={styles.Header}>Sign In</h1>
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
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label className="d-none">Password</Form.Label>
                        <Form.Control 
                        className={styles.Input}
                        type="password" 
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange} 
                        />
                    </Form.Group>
                    {errors.password?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    <Button className={`${btnStyles.Button} ${btnStyles.Width} ${btnStyles.Colour}`} type="submit">
                        Log In
                    </Button>
                    {errors.non_field_errors?.map((message, idx) =>( 
                    <Alert key={idx} variant="warning" className="mt-3">
                        {message}
                    </Alert>
                    ))}
                    </Form>
                </Container>
                <Container className={`mt-3 ${appStyles.Body}`}>
                        <Link className={styles.Link} to="/signup">
                            <p>Don't have an account <span>Sign In</span></p>
                      </Link>
                </Container>
            </Col>
        </Row>
        </Container>
    );
}

export default SignInForm;