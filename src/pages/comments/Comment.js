import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import EditCommentForm from "./EditCommentForm";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Comment.module.css";


const Comment = (props) => {

    const {
        profile_id, profile_image, owner, updated_at, content, id, setPost, setComments,} = props;
    
    const [showEditForm, setShowEditForm] = useState(false);
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setPost((prevPost) => ({
                results: [ 
                    { 
                    ...prevPost.results[0],
                    comments_count: prevPost.results[0].comments_count - 1,
                },
            ],
        }));

        setComments ((prevComments) => ({
            ...prevComments,
            results: prevComments.result.filter((comment) => comment.id !== id),
            }));
        } catch (err) {}
    };
    
    return (
        <> 
        <hr />
        <Media>
            <Link to={`/profile/${profile_id}`}>
                <Avatar src={profile_image}/>
            </Link>
            <Media.Body className="align-self-center ml-2">
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
                {showEditForm ? (
                    <EditCommentForm 
                        id={id}
                        profile_id={profile_id}
                        profile_image={profile_image}
                        content={content}
                        setComments={setComments}
                        setShowEditForm={setShowEditForm}
                    />
                ) : (
                    <p className={styles.CommentText}>{content}</p>
                )}
            </Media.Body>
            {is_owner && !showEditForm && (
                <MoreDropdown
                    handleEdit={() => setShowEditForm(true)} handleDelete={handleDelete}
                />
            )}
        </Media> 
        </>
    );
};



export default Comment;