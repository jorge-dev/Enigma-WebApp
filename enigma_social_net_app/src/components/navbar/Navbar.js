import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "../../utilities/CustomButton";
import CreatePost from '../post/CreatePost'
import Notifications from './Notifications'
//Material Ui
import AppBar from "@material-ui/core/AppBar";
import {Switch,FormControl}from '@material-ui/core'
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';

//redux
import { connect } from "react-redux";

// icons
import lightMode from '@material-ui/icons/Brightness7Rounded';
import darkMode from '@material-ui/icons/Brightness4Rounded';
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";


class Navbar extends Component {

   
  render() {
    const { authenticated, toggleDarkMode } = this.props;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <CreatePost/>

              <Link to="/">
                <CustomButton tip="Home">
                  <HomeRoundedIcon color="inherit" />
                </CustomButton>
              </Link>

              <Notifications/>
              <CustomButton tip="Toggle Dark/Light Mode">
                <Switch onClick ={toggleDarkMode}/>
              </CustomButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
        <Button></Button>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  toggleDarkMode:PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
