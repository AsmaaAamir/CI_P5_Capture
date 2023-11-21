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

import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
    const currentUser = useCurrentUser();
    
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
                    <Route exact path="/" render={() => ( <AllPostsPage message="No results Found. Please try again"/>)}/>
                    <Route exact path="/posts/addpost" render={ () => <AddPostForm/> }/>
                    <Route exact path="/posts/addpost" render={ () => <AddPostForm/> }/>
                    <Route exact path="/posts/:id" render={ () => <PostPage/> }/>
                    <Route render={() => <p> Page Not Found! </p>} />
                </Switch>
            )}
        </Container>
    </div>
  );
}

export default App;