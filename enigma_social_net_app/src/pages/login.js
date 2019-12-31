import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../styles/Login-signup";
import PropTypes from "prop-types";
import enigmaIcon from "../images/logo.png";
import axios from "axios";
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

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
      isPasswordShown: false,
      
    };
  }

  togglePwdVisibility = () => {
    const isShown = this.state.isPasswordShown;
    this.setState({ isPasswordShown: !isShown });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      loading: true
    });
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("/login", userData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FbIdToken", `Bearer ${res.data.token}`);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({ errors: err.response.data, loading: false });
      });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };


  render() {
    const { classes } = this.props;
    const {
      errors,
      loading,
      isPasswordShown
    } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item xs={6} spacing={2}>
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
              Dont have an acount? Sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(login);
