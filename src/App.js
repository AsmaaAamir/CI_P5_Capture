import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import './api/axiosDefaults';
import SignUpForm from "./pages/auth/SignUpForm";
   

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Body}>
                <Switch>
                    <Route exact path="/" render={ () => <WelcomePage />} />
                    <Route exact path="/signin" render={() => <h1>Sign In Page</h1>}/>
                    <Route exact path="/signup" render={() => <SignUpForm />} />
                    <Route render={() => <p> Page Not Found</p>} />
                </Switch>
        </Container>
        </div>
  );
}

export default App;