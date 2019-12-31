import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

//Components
import Navbar from "./components/Navbar";
import AuthRoute from "./utilities/AuthRoute";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#63a4ff",
      main: "#1976d2",
      dark: "#004ba0",
      contrastText: "#fff"
    },
    secondary: {
      light: "#90ff71",
      main: "#58d63f",
      dark: "#05a300",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  },
  spacing: 2
});

let authenticate;
const token = localStorage.FbIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    
    window.location.href = "/login";
    localStorage.clear(); // take a look at this if something is not working 
    authenticate = false;
  } else authenticate = true;
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
       
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home}></Route>
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticate={authenticate}
                ></AuthRoute>
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticate={authenticate}
                ></AuthRoute>
              </Switch>
            </div>
          </Router>
      
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
