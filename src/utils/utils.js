import { axiosReq } from "../api/axiosDefaults";

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next);
        setResource((prevResource) => ({
            ...prevResource, 
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id)
                ? acc : [...acc, cur];
            }, prevResource.results),
        }));
    } catch (err) {}
};

export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id ? {
        // Allows to update follower count and set its following id // 
        ...profile, 
        followers_count: profile.followers_counts + 1,
        following_id,
    } 
    : profile.is_owner ? 
        // Allows profile loged in user to update its following count //
        {
        ...profile, 
        following_count: profile.following_count + 1
    } : profile;
};

export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id ?
    //Allows the usuer to unfollow and update its followers counts//
    {
        ...profile, 
        followers_count: profile.followers_count - 1,
        following_id: null,
    }
    : profile.is_owner ? { 
        ...profile, following_count: profile.following_count - 1 
    } : profile;
};