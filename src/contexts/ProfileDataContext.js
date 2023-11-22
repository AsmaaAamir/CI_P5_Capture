import { createContext, useContext, useEffect, useState} from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
//import { followHelper, unfollowHelper } from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        popularProfiles: { results: [] },
    });

    const currentUser = useCurrentUser();
    /* Allow users to make request to follow, send informtion
    prpfile(id), and users clicked on follow, which would also 
    update popular profile data */

    //const handleFollow = async (clickedProfile) => {
    //    try {
     //       const { data } = await axiosRes.post("/followers/", {
    //            followed: clickedProfile.id,
     //       });
//
       //     setProfileData((prevState) => ({
        //        ...prevState, pageProfile: {
        //            results: prevState.pageProfile.results.map((profile) =>
        //            followHelper(profile, clickedProfile, data.id)
        //            ),
        //        },
       //     }));
      //  } catch (err) {
    //        //console.log(err);
     //   }
  //  };
    /* Allow user to unfollow by clicking unfollow button */
   // const handleUnfollow = async (clickedProfile) => {
        //ry {
         //   await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

           // setProfileData((prevState) => ({
            //    ...prevState, pageProfile: {
           //         results: prevState.pageProfile.results.map((profile) =>
            //        unfollowHelper(profile, clickedProfile)
           //         ),
           //     },
           //     popualrProfiles: {
           //         ...prevState.popularProfiles,
           //         results: prevState.popularProfiles.result.map((profile) => 
           //         unfollowHelper(profile, clickedProfile)
           //         ),
           //     },
         //   }));
     //   } catch (err) {
            //console.log(err);
    //    }     
  //  };
    /* Collectes all the popular profile data and descending
    in order to most followers the user has */
    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(
                    "/profiles/?ordering=-followers_count"
                );
                setProfileData((prevState) => ({
                    ...prevState, popularProfiles: data,
                }));
            } catch (err){
               //console.log(err);
            }
        };
        handleMount();
    }, [currentUser]);
        
    return(
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={setProfileData}>
                { children }
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};