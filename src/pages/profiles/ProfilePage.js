import React, { useState, useEffect} from "react";
import { Col, Row, Container, Button} from "react-bootstrap";

import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";

import styles from "../../styles/ProfilePage.module.css";
import {useCurrentUser} from "../../contexts/CurrentUserContext";


function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
 
    useEffect(() => {
        setHasLoaded(true);
    },[])

    
    /* submits a request to an API to retrieve user
     profiles and posts update profiles page data */

    
    /*  User Profile Information Display */
    const mainProfile = (
        <>
            <Row noGutter className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <p>image </p>
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">Profile username</h3>
                    <Row className="justify-content-center no-gutters">
                        <p>Stact</p>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                            <Button className={`${styles.Button} ${styles.BlackOutLine}`}
                                >
                                    Unfollow 
                            </Button>
                            <Button className={`${styles.Button} ${styles.BlackOutLine}`}
                            >
                                Follow 
                        </Button>

                    </Col>
                
            </Row>
        </>
        );
    
    /* displaying users posts from the user */
    
    const mainProfilePosts = (
        <>
            <hr/> 
            <p className="text-center">owner 's posts </p>
            <hr/>

        </>
    );
    return (
        <Row>
            <Col className="py-2 p-2 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={styles.Content}>
                    {hasLoaded ? ( 
                        <> {mainProfile} {mainProfilePosts} </>
                    ): ( 
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-blokc p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;