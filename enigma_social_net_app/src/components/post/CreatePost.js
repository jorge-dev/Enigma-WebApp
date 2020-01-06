import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CustomButton from "../../utilities/CustomButton";


// Redux stuff

import { connect } from "react-redux";
import { postPost,clearErrors } from "../../redux/actions/dataActions";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

//icons
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CloseIcon from "@material-ui/icons/Close";

const styles = {
 
    submitButton: {
        position: 'relative',
        float: 'right',
        margin: "13px 0 10px 0"
      },
      progressSpinner: {
        position: 'absolute'
      },
      closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
      }
};

class CreatePost extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
      this.props.clearErrors()
    this.setState({ open: false, errors: {} });
  };

  handleChange = (evt) =>{
      this.setState({[evt.target.name]: evt.target.value})
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.postPost({body : this.state.body})
  }
  

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <CustomButton onClick={this.handleOpen} tip="Create a new Post">
          <AddCircleRoundedIcon />
        </CustomButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <CustomButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </CustomButton>
          <DialogTitle>Sumbit a new Post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="SCREAM!!"
                multiline
                rows="3"
                placeholder="Scream at your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postPost , clearErrors})(
  withStyles(styles)(CreatePost)
);
