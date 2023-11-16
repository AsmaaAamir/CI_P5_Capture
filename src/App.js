import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
   

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Body}>
                <Switch>
                    <Route exact path="/" render={ () => <WelcomePage/>} />
                    <Route exact path="/signin" render={() => <h1>Sign In Page</h1>} />
                    <Route exact path="/signup" render={() => <h1>Sign Up Page</h1>} />
                    <Route render={() => <p> Page Not Found</p>} />
                </Switch>
        </Container>
        </div>
  );
}

export default App;