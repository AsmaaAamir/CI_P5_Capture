import React, { useState } from "react";
import { Form } from "react-bootstrap";
import styles from "../../styles/AddEditCommentForm.module.css";
import { axiosRes } from "../../api/axiosDefaults"; 

function EditCommentForm(props) {

    const {id, content, setShowEditForm, setComments} = props;
    const [formContent, setFormContent] = useState(content);

    const handleChange=  (e) => {
        setFormContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDeafult();
        try{
            await axiosRes.put(`/comments/${id}/`, {
                content: formContent.trim(),
            });
        setComments((prevComments) => ({
            ...prevComments, 
            results: prevComments.results.map((comment) => {
                return comment.id === id ? {
                    ...comment, 
                    content: formContent.trim(),
                    updatd_at: "now",
                }
                : comment;
            }),
        }));
        setShowEditForm(false);
        } catch (err){
            //console.log(err);
        }    
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control 
                    as="textarea"
                    row={2}
                    value={formContent}
                    className={styles.Form}
                    onChange={handleChange}
                />
            </Form.Group>
            <div className="text-right">
                <button className={styles.Button} onClick={() => setShowEditForm(false)}
                    type="button"> Cancel </button>
                <button className={styles.Button} disabled={!content.trim()}
                    type="submit"> Save </button>
            </div>
        </Form>
    );
}

export default EditCommentForm;