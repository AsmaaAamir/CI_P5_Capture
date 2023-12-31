import React from 'react';
import { Card, OverlayTrigger, Tooltip, Media } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import Avatar from '../../components/Avatar';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from '../../styles/Post.module.css';
import { Link, useHistory } from "react-router-dom";
import { MoreDropdown } from '../../components/MoreDropdown';


const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        category,
        image,
        updated_at, 
        postPage,
        setPosts, } = props;

        const currentUser = useCurrentUser();
        const is_owner = currentUser?.username === owner;
        const history = useHistory();

        const handleEdit = () => {
            history.push(`/posts/${id}/edit`)
        };

        const handleDelete = async () => {
            try{
                await axiosRes.delete(`/posts/${id}/`);
                history.goBack();
            } catch (err) {
                //console.log
            }
        };


        const handleLike = async () => { 
            try {
                const { data } = await axiosRes.post("/likes/", { post: id });
                setPosts((prevPosts) => ({
                    ...prevPosts, 
                    results: prevPosts.results.map((post) => {
                        return post.id === id ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post; 
                    }),
                }));
            } catch (err) {
                //console.log(err);
            }
        };

        /*
        A user may "unlike" the post. This sends a request for the post with user ID to the API. led to the post's like count being reduced by 1.  
        */
        const handleUnlike = async () => {
            try { 
                await axiosRes.delete(`/likes/${like_id}/`);
                setPosts((prevPosts) => ({
                    ...prevPosts,
                    results: prevPosts.results.map((post) => {
                        return post.id === id ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                    }),
                }));
        } catch (err) {
            //console.log(err);
        }
    };

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                            {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && postPage && <MoreDropdown handleDelete={handleDelete} handleEdit={handleEdit}/>}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {category && <Card.Text>{category}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        /* Alerting user they cant't like their own posts */
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own post!</Tooltip>}>   
                            <i className="far fa-heart" />   
                        </OverlayTrigger>
                        /*  Checking if user has already liked this post */
                        ) : like_id ? (
                            <span onClick={handleUnlike}>
                                <i className={`far fa-heart ${styles.Heart}`}/>
                            </span>
                        ) : currentUser ? (
                            <span onClick={handleLike}>
                                <i className={`far fa-heart ${styles.HeartOutline}`}/>
                            </span>
                        ) : (
                            <OverlayTrigger placement="top" overlay={<Tooltip>Please log in to like the Post!</Tooltip>}>
                                <i className="far fa-heart" />
                            </OverlayTrigger>
                        )}
                        {likes_count}
                        <Link to={`/posts/${id}`}>
                            <i className="far fa-comments"/>
                        </Link>
                        {comments_count}
                    </div>
            </Card.Body>
        </Card>
    );
};

export default Post;