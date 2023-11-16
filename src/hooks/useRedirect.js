import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    /*
    determines whether the user is logged in at the moment. 
    Refreshing the access token to send the user to the 
    homepage if they are logged in
    */

    useEffect(() => {
        const handleMount = async () =>{
            try {
                await axios.post("/dj-rest-auth-token-refresh/");
                    if (userAuthStatus === "loggedIn") {
                        history.push("/");
                    }
            } catch (err) {
                if (userAuthStatus === "loggedOut") {
                    history.push("/");
                }
            }
        };
        handleMount();
    }, [history, userAuthStatus]);
};