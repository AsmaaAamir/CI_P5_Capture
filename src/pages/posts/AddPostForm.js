import React, { useState } from "react";
import {Form,  Row, Col, Container, Image} from "react-bootstrap";
import upload from "../../assets/uploading-post.png";
import styles from "../../styles/AddEditPost.module.css";
import Asset from "../../components/Asset";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";


function AddPostForm(){
    const [postData ] = useState ({
        title: '',
        description: '',
        category: '',
        image: '',
    });

    const {image } = postData;
    return (
        <Row>
            <Col className="py-2 p-2 p-md2" md={10} lg={12}>
                <Container className={`${appStyles.Body} ${styles.Container} d-flexflex-column justify-content-center`}>
                    <Form.Group className="add-post">
                        {image ? (
                            <>
                                <figure>
                                    <Image className={styles.Image} src={image} alt="users uploaded images" rounded />
                                </figure>
                                <div>
                                    <Form.Label className={`${btnStyles.Button} ${styles.Grey} btn`}
                                        htmlFor="image-upload">
                                        Change the image
                                    </Form.Label>
                                </div>
                            </>
                        ): (
                            <Form.Label className="d-flex justify-content-center"
                            htmlFor="image-upload">
                            <Asset
                                rc={upload}
                                message="Click or tap to upload an image"/>
                            </Form.Label>
                            )}
                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={""}
                                ref={""}/>
                    </Form.Group>
                </Container>
            </Col>
        </Row>
    );

}

export default AddPostForm;