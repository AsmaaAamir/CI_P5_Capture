import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, Image} from "react-bootstrap";
import { useParams } from "react-router-dom";
//import InfiniteScroll  from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData, } from "../../contexts/ProfileDataContext";
//import { ProfileEditDropdown } from "../../components/MoreDropdown";
//import { fetchMoreData } from "../../utils/utils";
import styles from "../../styles/ProfilePage.module.css";
//import Post from "../posts/Post";
//import NoResult from "../../assets/no-result.png";
import btnStyles from "../../styles/Button.module.css"; 

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const setProfileData = useSetProfileData();
    const { pageProfile } = useProfileData();

    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;
    
    /* submits a request to an API to retrieve user
     profiles and posts update profiles page data */

    useEffect(() => {
        setHasLoaded(true);
    }, []);
    
    /*  User Profile Information Display e.g how many post they have or 
    number of follower and how many people they follow */
    const mainProfile = (
        <>
            <Row noGutter className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image className={styles.ProfileImage} roundedCircle src={profile?.image} />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        <Col xs={3} className="my-2">
                            <div className={styles.ProfileCount}>{profile?.posts_count}</div>
                            <div className={styles.ProfileTitle}>Posts</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div className={styles.ProfileCount}>{profile?.followers_count}</div>
                            <div className={styles.ProfileTitle}>Followers</div>
                        </Col>
                        <Col xs={3} className="my-2">
                            <div className={styles.ProfileCount}>{profile?.following_count}</div>
                            <div className={styles.ProfileTitle}>Following</div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser && !is_owner && (
                        profile?.following_id ? (
                            <Button className={`${btnStyles.Button} ${btnStyles.ProfileFollow}`}
                                onClick={()=> {}} >
                                    Unfollow 
                            </Button>
                        ) : (
                            <Button className={`${btnStyles.Button} ${btnStyles.ProfileFollow}`}
                            onClick={() => {}} >
                                Follow 
                        </Button>
                        ))}
                    </Col>
                    {profile?.content && <Col className="p-3">{profile.content}
                </Col>}
            </Row>
        </>
    );
    
    /* displaying profile owner posts*/
    
    const mainProfilePosts = (
        <>
            <hr/> 
            <p className="text-center">Profiel owners 's posts </p>
            <hr/>
        </>
    );
    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />
                <Container className={styles.Content}>
                    {hasLoaded ? ( 
                        <> 
                            {mainProfile} 
                            {mainProfilePosts} 
                        </>
                    ): ( 
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default ProfilePage;