import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../styles/Login-signup";
import PropTypes from "prop-types";
import enigmaIcon from "../images/logo.png";

import { Link } from "react-router-dom";
import zxcvbn from "zxcvbn";

//material Ui
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// Redux
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
      pwdScore: 0,
      pwdWarning: "",
      pwdSuggestions: [],
      pwdSelect: false,
      isPasswordShown: false,
      isConfPasswordShown: false
    };
  }

  togglePwdVisibility = () => {
    const isShown = this.state.isPasswordShown;
    this.setState({ isPasswordShown: !isShown });
  };
  toggleConfPwdVisibility = () => {
    const isShown = this.state.isConfPasswordShown;
    this.setState({ isConfPasswordShown: !isShown });
  };

  pwdLabel = score => {
    switch (score) {
      case 0:
        return "Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  onPasswordChange = evt => {
    this.state.errors.password = "";
    const pass = evt.target.value;
    const evalPass = zxcvbn(pass);
    console.log(evalPass);
    this.setState({
      password: pass,
      pwdScore: evalPass.score,
      pwdWarning: evalPass.feedback.warning,
      pwdSuggestions: evalPass.feedback.suggestions,
      pwdSelect: true
    });
  };

  render() {
    const { classes, UI:{loading} } = this.props;
    const {
      errors,
      pwdScore,
      pwdSuggestions,
      pwdWarning,
      pwdSelect,
      isPasswordShown,
      isConfPasswordShown
    } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item xs={6}>
          <img src={enigmaIcon} alt="enigma icon" className={classes.images} />
          <Typography variant="h3" className={classes.pageTitle}>
            Signup
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
              helperText={errors.password ? errors.password : pwdWarning}
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.onPasswordChange}
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
            {/* Password sthrength bar */}
            {pwdSelect && (
              <div className="pwd-strength-meter ">
                <progress
                  value={pwdScore}
                  max="4"
                  className={`pwd-strength-meter-progress strength-${this.pwdLabel(
                    pwdScore
                  )}`}
                />
                <br />
                <label className="pwd-strength-meter-label">
                  {pwdSelect && (
                    <>
                      <strong>Password strength:</strong>{" "}
                      {this.pwdLabel(pwdScore)}
                    </>
                  )}
                </label>
              </div>
            )}

            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type={isConfPasswordShown ? "text" : "password"}
              label="Confirm Password"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              className={classes.textField}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    {isConfPasswordShown ? (
                      <Visibility className="pwd_visibility" onClick={this.toggleConfPwdVisibility} />
                    ) : (
                      <VisibilityOff className="pwd_visibility" onClick={this.toggleConfPwdVisibility} />
                    )}
                  </InputAdornment>
                )
              }}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Username"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              className={classes.textField}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Already have an acount? Log in <Link to="/login">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired

};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});



export default connect(mapStateToProps,{signupUser})(withStyles(styles)(signup));