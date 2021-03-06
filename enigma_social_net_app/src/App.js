import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";
import Theme from "./styles/Theme";
import storage from "local-storage-fallback";

import Footer from './utilities/Footer'


//Components
import Navbar from "./components/navbar/Navbar";
import AuthRoute from "./utilities/AuthRoute";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";


// const theme = createMuiTheme(Theme);

axios.defaults.baseURL =
  "https://us-central1-enigma-social-network.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
    // localStorage.clear(); // take a look at this if something is not working
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

// dark mode
function getInitialTheme() {
  const savedTheme = storage.getItem("theme");
  return savedTheme
    ? JSON.parse(savedTheme)
    : {
        ...Theme,
        palette: {
          ...Theme.palette,
          type: "light"
        }
      };
}

const SetDarkMode = () => {
  const [myTheme, setTheme] = useState(getInitialTheme);

  const {
    palette: { type }
  } = myTheme;

  const toggleDarkMode = () => {
    const updatedTheme = {
      ...myTheme,
      palette: {
        ...myTheme.palette,
        type: type === "light" ? "dark" : "light"
      }
    };

    setTheme(updatedTheme);
  };

  return [myTheme, toggleDarkMode];
};

function App() {
  const [myTheme, toggleDarkMode] = SetDarkMode();
  const theme = createMuiTheme(myTheme);

  //stores the current them into localstorage
  useEffect(() => {
    storage.setItem("theme", JSON.stringify(myTheme), [myTheme]);
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Router>
          <Navbar toggleDarkMode={toggleDarkMode} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}></Route>
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/scream/:screamId"
                component={user}
              />
            </Switch>
          </div>
          <Footer/>
         
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
