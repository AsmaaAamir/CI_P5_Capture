import React, { useRef, useState} from "react";
import {Form, Button, Row, Col, Container, Image, Alert} from "react-bootstrap";
import Upload from "../assets/uploading-post.png";
import styles from "../styles/AddEditPost.module.css";
import Asset from "../components/Asset";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import { useRedirect } from "../hooks/useRedirect";

function AddPostForm(){
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});

    const [postData, setPostData ] = useState ({
        title: "",
        description: "",
        category: "",
        image: "",
    });

    const { title, description, category, image } = postData;
    
    const imageInput = useRef(null);

    const history = useHistory();

    const handleChange = (e) =>{
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.lenth) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("image", imageInput.current.files[0]);
        
        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push('/posts/${data.id}');
        }catch (err) {
            //console.log(err);
            if (err.response?.status !== 401){
                setErrors(err.response?.data);
            }
        }

    };

    const textFields =(
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
             <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    type="text"
                    name="description"
                    rows={8}
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control 
                    as="select"
                    name="category"
                    value={category}
                    onChange={handleChange}
                >
                <option>Please select the Country</option>
                <option value="India">India</option>
                <option value="China">China</option> 
                <option value="United States">United States</option>
                <option value="Bangladesh">Bangladesh</option> 
                <option value="Afghanistan">Afghanistan</option> 
                <option value="Nigeria">Nigeria</option>
                <option value="Russia">Russia</option> 
                <option value="Yemen">Yemen</option> 
                <option value="Indonesia">Indonesia</option>
                <option value="Brazil">Brazil</option> 
                <option value="Mali">Mali</option> 
                <option value="Philippines">Philippines</option>
                <option value="Mexico">Mexico</option>
                <option value="Mozambique">Mozambique</option> 
                <option value="Egypt">Egypt</option>
                <option value="United Kingdom">United Kingdom</option> 
                <option value="Poland">Poland</option>
                <option value="France">France'</option>
                <option value="Ethiopoa">Ethiopoa</option> 
                <option value="Saudi Arabia">Saudi Arabia</option> 
                <option value="South Africa">South Africa</option>
                <option value="Iran">Iran</option>
                <option value="Algeria">Algeria</option> 
                <option value="Myanmar">Myanmar</option>
                <option value="Tanzania">Tanzania</option> 
                <option value="Thailand">Thailand</option> 
                <option value="Ghana">Ghana</option>
                <option value="South Korea">South Korea</option> 
                <option value="Germany">Germany</option>
                <option value="Uganda">Uganda</option>
                <option value="Angola">Angola</option> 
                <option value="Japan">Japan</option> 
                <option value="Mauritania">Mauritania</option>
                <option value="Peru">Peru</option> 
                <option value="Pakistan">Pakistan</option> 
                <option value="Uzbekistan">Uzbekistan</option>
                <option value="Sudan'">Sudan</option> 
                <option value="Argentina">Argentina</option> 
                <option value="Burundi">Burundi</option>
                <option value="Canada">Canada</option> 
                <option value="Madagascar">Madagascar</option>
                <option value="Nepal">Nepal</option>
                <option value="Morocco">Morocco</option> 
                <option value=""></option> 
                <option value="Malaysia">Malaysia</option>
                <option value="Chad">Chad</option>
                <option value="Libya">Libya</option> 
                <option value="Iraq">Iraq</option>
                <option value="Bolivia">Bolivia</option> 
                <option value="Rwanda">Rwanda</option> 
                </Form.Control>
            </Form.Group>
            {errors?.category?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button className={'${styles.Button} ${Styles.Grey}'}
            onClick={() => {}} >
                Create
            </Button>
            <Button className={'${styles.Button} ${Styles.Grey}'}
            onClick={() => {}} >
                Cancel
            </Button>
        </div>
    );
    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-2 p-md2" md={7} lg={8}>
                    <Container className={'${app.styles/Content} ${styles.Container} d-flexflex-column justify-content-center'}>
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                <figure>
                                    <Image className={styles.Image} src={image} rounded />
                                </figure>
                                <div>
                                    <Form.Label className={`${styles.Button} ${styles.Grey} btn`}
                                        htmlFor="image-upload">
                                        Change the image
                                    </Form.Label>
                                </div>
                                </>
                            ) : (
                            <Form.Label className="d-flex justify-content-center"
                                    htmlFor="image-upload">
                                <Asset
                                    src={Upload}
                                    message="Click or tap to upload an image"/>
                            </Form.Label>
                            )}

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}/>
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                <Container className={styles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );

}

export default AddPostForm;