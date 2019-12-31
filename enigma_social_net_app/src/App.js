import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'


//Components
import Navbar from "./components/Navbar";
// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63a4ff',
      main: '#1976d2',
      dark: '#004ba0',
      contrastText: '#fff',
    },
    secondary: {
      light: '#90ff71',
      main: '#58d63f',
      dark: '#05a300',
      contrastText: '#fff',
    },
    
  },
  typography:{
    useNextVariants:true
  },
  spacing:2
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
<div className="App">
      <Router>
        <Navbar/>
        <div className="container">
        <Switch>
          <Route exact path="/" component={home}></Route>
          <Route exact path="/login" component={login}></Route>
          <Route exact path="/signup" component={signup}></Route>
        </Switch>
        </div>
      </Router>
    </div>
</MuiThemeProvider>
  );
}

export default App;
