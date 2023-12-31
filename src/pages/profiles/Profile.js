import React from "react";
import { Button } from "react-bootstrap";
import  { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useSetProfileData} from "../../contexts/ProfileDataContext";

const Profile = (props) => { 
    const { profile, mobile, imageSize = 55} = props;
    const { id, following_id, image, owner } = profile;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username ===  owner;
    const {handleFollow, handleUnfollow} = useSetProfileData();

    return(
        <div className={`my-3 d-flex align-item-center ${mobile && "flex-column"}`}>
            <div>
                <Link to={`/profiles/${id}`} className="align-self-center">
                    <Avatar src={image} height={imageSize}/>
                </Link>
            </div>
            <div className={`mx-2 ${styles.Break}`}>
                <strong>{owner}</strong>
            </div>
            <div className={`text-right ${!mobile && "ml-auto"}`}>
                {!mobile && currentUser && !is_owner && (following_id ? (
                    <Button className={`${btnStyles.Button} ${btnStyles.Follow}`} onClick={() => handleUnfollow(profile)}>
                            Unfollow 
                    </Button>
                ) : (
                    <Button className={`${btnStyles.Button} ${btnStyles.Follow}`} onClick={() => handleFollow(profile)}>
                            Follow 
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Profile;