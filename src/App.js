import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import AddPostForm from "./pages/posts/AddPostForm";
import PostPage from "./pages/posts/PostPage";
import AllPostsPage from"./pages/posts/AllPostsPage";
import EditPostForm from "./pages/posts/PostEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PageNotFound from "./components/PageNotFound";
import EditProfileForm from "./pages/profiles/EditProfileForm";

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || "";

    return (
    <div className={styles.App}>
        <NavBar/>
        <Container className={styles.Body}> 
            {!currentUser ? (
                <Switch>
                    <Route exact path="/" render={ () => <WelcomePage/> }/> 
                    <Route exact path="/signin" render={ () => <SignInForm /> }/>
                    <Route exact path="/signup" render={ () => <SignUpForm /> }/>
                    <Route render={()=> <WelcomePage />} />
                </Switch>
            ) : ( 
                <Switch>
                    {/* Feed Icone route  */}
                    <Route exact path="/feed" render={() => <AllPostsPage/> } />

                    {/* Liked Icone route  */}
                    <Route exact path="/liked" render={() => ( <AllPostsPage 
                        message="No results Found. Please try again" 
                        filter={`likes__owner_profile=${profile_id}&ordering=-likes_created_at&`}/> )}/>

                    <Route exact path="/posts/addpost" render={ () => <AddPostForm/> }/>
                    <Route exact path="/posts/:id" render={ () => <PostPage/> }/>
                    <Route exact path="/posts/:id/edit" render={ () => <EditPostForm/> }/>
                    <Route exact path="/profiles/:id" render={ () => <ProfilePage/> }/>
                    <Route exact path="/profiles/:id/edit" render={ () => <EditProfileForm/> }/>
                    <Route render={() => <PageNotFound />} />
                </Switch>
            )}
        </Container>
    </div>
  );
}

export default App;