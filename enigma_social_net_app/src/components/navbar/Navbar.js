import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButton from "../../utilities/CustomButton";
import CreatePost from "../post/CreatePost";
import Notifications from "./Notifications";
//Material Ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';

//redux
import { connect } from "react-redux";

// icons
import LightMode from "@material-ui/icons/Brightness7Rounded";
import DarkMode from "@material-ui/icons/Brightness4Rounded";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

class Navbar extends Component {
  state = {
    isDark: false
  };

  toggleDark = () => {
    this.props.toggleDarkMode();
    const toggle = this.state.isDark;
    this.setState({ isDark: !toggle });
  };

  render() {
    const { authenticated} = this.props;
    const { isDark } = this.state;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <CreatePost />

              <Link to="/">
                <CustomButton tip="Home">
                  <HomeRoundedIcon color="inherit" />
                </CustomButton>
              </Link>

              <Notifications />
              <CustomButton
                tip="Toggle Dark/Light Mode"
              >
                {isDark ? (
                  <DarkMode onClick={this.toggleDark} />
                ) : (
                  <LightMode onClick={this.toggleDark} />
                )}
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
              <CustomButton
                tip="Toggle Dark/Light Mode"
                tipClassName="dark-mode-btn"
              >
                {isDark ? (
                  <LightMode onClick={this.toggleDark} />
                ) : (
                  <DarkMode onClick={this.toggleDark} />
                )}
              </CustomButton>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
