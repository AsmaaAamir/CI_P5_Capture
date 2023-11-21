import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/AddEditCommentForm.module.css";


function AddCommentForm(props){
    const { post, setPost, setComments, 
        profileImage, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (e) => {
    setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const { data } = await axiosRes.post("/comments/", { 
                content, post, });
            
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPost((prevPost) =>({ 
                results: [ {
                    ...prevPost.results[0],
                    comments_count: prevPost.result[0].comments_count + 1,
                },
            ],
        }));
        setContent("");
        } catch (err){
            console.log(err);
        }
    };
    
    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link tp={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage}/>
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        as="textarea"
                        row={2}
                        placeholder="Please type your comment..."
                        value={content}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <button className={`${styles.Button} btn d-block ml-auto`}
                disabled={!content.trim()} type="submit">
                Post
            </button>
        </Form>
    );
}

export default AddCommentForm;