import React, {useEffect, useState, useRef} from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Row, Col, Container, Image, Button, Alert } from "react-bootstrap";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const EditProfileForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();


    const [profileData, setProfileData] = useState({
        name: "",
        content: "",
        image: "",
    });

    const { name, content, image } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const { name, content, image } = data;
                    setProfileData({ name, content, image }); 
                } catch (err) {
                    //consol.log(err)
                    history.push("/");
                }
            } else { 
                history.push("/")
            }
        };

        handleMount();
        }, [currentUser, history, id]);

        const handleChange = (e) => {
            setProfileData({
                ...profileData,
                [e.target.name]: e.target.value,          
            });
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();

            formData.append("name", name);
            formData.append("content", content);

            if (imageFile?.current?.files[0]){
                formData.append("image", imageFile?.current?.filed[0]);
            }
            try {
                const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
                setCurrentUser((currentUser) => ({
                    ...currentUser,
                    profiles_image: data.image,
                }));
                history.goBack();
            }catch (err) {
                //consol.log(err)
                setErrors(err.response?.data)
            }
        };
        const textFields = (
            <> 
                <Form.Group>
                    <Form.Label >
                        <h3 className={appStyles.FontH1}>Bio</h3>
                    </Form.Label>
                    <Form.Control 
                        as="textarea"
                        row={8} 
                        name="content" 
                        value={content} 
                        onChange={handleChange}
                    />
                </Form.Group>
                {errors?.content?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
    
                <Button className={styles.Button} onClick={() => 
                    history.goBack()}> 
                    Cancel </Button>
                
                <Button className={styles.Button} type="submit">
                    Save</Button>
            </>
        );
        return (
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6} >
                        <Container className={styles.Content}>
                            <Form.Group>
                                {image && (
                                    <figure>
                                        <Image className={styles.ProfileImage} roundedCircle src={image} alt="Users uploaded Profile Iamge" />                                   
                                    </figure>
                                )}
                                {errors?.image?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <div>
                                    <Form.Label  className={`${styles.Button} ${styles.Colour} btn`}
                                        htmlFor="image-upload">
                                        <p >Change the image</p>
                                    </Form.Label>
                                </div>
                                <Form.File 
                                    id="image-upload"
                                    ref={imageFile}
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files.length) {
                                            setProfileData({
                                                ...profileData,
                                                image: URL.createObjectURL(e.target.files[0]),
                                            });
                                        }
                                    }}
                                />        
                            </Form.Group>
                            {errors?.image?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                            ))}
                            <div className="d-md-none"> {textFields}</div>
                        </Container>
                    </Col>
                    <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text center">
                        <Container className={styles.Content}>{textFields}</Container>
                    </Col>
                </Row>
            </Form>
        );
};


export default EditProfileForm;