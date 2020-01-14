import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CustomButton from "../../utilities/CustomButton";
import CreatePost from "../post/CreatePost";
import Notifications from "./Notifications";
import enigmaIcon from "../../images/enigma-logo-white.png";
import Icon from "@mdi/react";

//Material Ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';

//redux
import { connect } from "react-redux";

// icons
import LightMode from "@material-ui/icons/Brightness7Rounded";
import DarkMode from "@material-ui/icons/Brightness4Rounded";
import { mdiLogin as LoginIcon } from "@mdi/js";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Grid from "@material-ui/core/Grid";
import SignupIcon from "@material-ui/icons/PersonAddRounded";

const styles = {
  title: {
    fontWeight: "bolder"
  },
  image: {
    width: 30,
    height: 30,
    margin: 0,
    padding: "4px 0 0 0 "
  }
};

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
    const { authenticated, classes } = this.props;
    const { isDark } = this.state;
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <Grid container spacing={4}>
            <Grid item sm={5}>
              <Typography className={classes.title} variant="h4" noWrap>
                <img
                  src={enigmaIcon}
                  alt="enigma icon"
                  className={classes.image}
                />{" "}
                ENIGMA
              </Typography>
            </Grid>

            <Grid item xs={6}>
              {authenticated ? (
                <Fragment>
                  <CreatePost />

                  <Link to="/">
                    <CustomButton tip="Home">
                      <HomeRoundedIcon color="inherit" />
                    </CustomButton>
                  </Link>

                  <Notifications />
                </Fragment>
              ) : (
                <Fragment>
                  {/* <Button color="inherit" component={Link} to="/">
                    Home
                  </Button> */}
                  <Link to="/">
                    <CustomButton tip="Home">
                      <HomeRoundedIcon color="inherit" />
                    </CustomButton>
                  </Link>
                  <Link to="/login">
                    <CustomButton tip="Login">
                      <Icon path={LoginIcon} size={0.9} color="white" />
                    </CustomButton>
                  </Link>
                  {/* <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button> */}
                  {/* <Button color="inherit" component={Link} to="/signup">
                    Signup
                  </Button> */}
                  <Link to="/signup">
                    <CustomButton tip="SignUp">
                      <SignupIcon color="inherit" />
                    </CustomButton>
                  </Link>
                </Fragment>
              )}
            </Grid>
            <Grid item sm>
              <CustomButton tip="Toggle Dark/Light Mode">
                {isDark ? (
                  <LightMode onClick={this.toggleDark} />
                ) : (
                  <DarkMode onClick={this.toggleDark} />
                )}
              </CustomButton>
            </Grid>
          </Grid>
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

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
