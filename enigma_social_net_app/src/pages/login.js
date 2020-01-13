import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../styles/Login-signup";
import PropTypes from "prop-types";
import enigmaIcon from "../images/logo.png";

import { Link } from "react-router-dom";


//material Ui
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

//Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions';

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    
      errors: {},
      isPasswordShown: false,
      
    };
  }

  togglePwdVisibility = () => {
    const isShown = this.state.isPasswordShown;
    this.setState({ isPasswordShown: !isShown });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData,this.props.history);
}

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };


  render() {
    const { classes , UI:{loading}} = this.props;
    const {
      errors,
      isPasswordShown
    } = this.state;
    return (
      <div className='root'>
      <Grid container className={classes.form} spacing={4}>
        <Grid item sm />
        <Grid item xs={6} >
          <img src={enigmaIcon} alt="enigma icon" className={classes.images} />
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type={isPasswordShown ? "text" : "password"}
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    {isPasswordShown ? (
                      <Visibility className="pwd_visibility" onClick={this.togglePwdVisibility} />
                    ) : (
                      <VisibilityOff className="pwd_visibility" onClick={this.togglePwdVisibility} />
                    )}
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Dont have an acount? Sign up <Link to="/signup" className={classes.logSignLink} >&#8594; here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  UI:PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login));
