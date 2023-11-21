import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Asset from "../components/Asset";


const PopularProfiles = () => {

    const [profileData, setprofileData] = useState({
        pageProfile: { results: []},
        popularProfiles : {results: []}
    });

    const { popularProfiles } = profileData;
    const currentUser = useCurrentUser()

    useEffect (() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
                setprofileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data,
            }));
        } catch (err) {
            //console.log(err)
        }
    }; handleMount()
    }, [currentUser]);

    return (
        <Container> 
            {popularProfiles.results.length ? (
                <>
                    <p>Most followed profiles.</p>
                        {popularProfiles.results.map((profile) => (
                                <p key={profile.id}>{profile.owner}</p>
                            ))}
                </>
            ) : (
                <Asset spinner />
                )}
        </Container>
    );
};
export default PopularProfiles;