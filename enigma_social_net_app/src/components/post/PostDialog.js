// // import React, { Component, Fragment } from "react";
// // import { withStyles } from "@material-ui/core/styles";
// // import { Link } from "react-router-dom";
// // import dayjs from "dayjs";
// // import LikeButton from "./LikeButton";

// // import PropTypes from "prop-types";
// // import CustomButton from "../../utilities/CustomButton";

// // //Material UI
// // import Dialog from "@material-ui/core/Dialog";
// // import DialogContent from "@material-ui/core/DialogContent";

// // import CircularProgress from "@material-ui/core/CircularProgress";
// // import Grid from "@material-ui/core/Grid";
// // import Typography from "@material-ui/core/Typography";

// // //Icons
// // import CloseIcon from "@material-ui/icons/Close";
// // import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
// // import ChatRoundedIcon from "@material-ui/icons/ChatRounded";

// // //Redux
// // import { connect } from "react-redux";
// // import { getPost } from "../../redux/actions/dataActions";

// // const styles = {
// //   invisibleSeparator: {
// //     border: "none",
// //     margin: 4
// //   },
// //   profileImage: {
// //     maxWidth: 200,
// //     height: 200,
// //     borderRadius: "50%",
// //     objectFit: "cover"
// //   },
// //   dialogContent: {
// //     padding: 20
// //   },
// //   closeButton: {
// //     position: "absolute",
// //     left: "90%"
// //   },
// //   expandButton: {
// //     position: "absolute",
// //     left: "90%"
// //   },
// //   spinnerDiv: {
// //     textAlign: "center",
// //     marginTop: 50,
// //     marginBottom: 50
// //   }
// // };

// // class PostDialog extends Component {
// //   state = {
// //     open: false
// //   };

// //   handleOpen = () => {
// //     this.setState({ open: true });
// //     this.props.getPost(this.props.screamId);
// //     console.log(this.props.screamId);
// //   };

// //   handleClose = () => {
// //     // this.props.clearErrors();
// //     this.setState({ open: false });
// //   };
// //   render() {
// //     const {
// //       classes,
// //       scream: {
// //         screamId,
// //         body,
// //         createdAt,
// //         likeCount,
// //         commentCount,
// //         userImage,
// //         userHandle
// //       },
// //       UI: { loading }
// //     } = this.props;

// //     const dialogMarkup = loading ? (
// //       <CircularProgress size={200} />
// //     ) : (
// //       <Grid container spacing={16}>
// //         <Grid item sm={5}>
// //           <img
// //             src={userImage}
// //             alt="ProfilePic"
// //             className={classes.profileImage}
// //           />
// //         </Grid>
// //         <Grid item sm={7}>
// //           <Typography
// //             component={Link}
// //             color="primary"
// //             variant="h5"
// //             to={`/users/${userHandle}`}
// //           >
// //             @{userHandle}
// //           </Typography>
// //           <hr className={classes.invisibleSeparator} />
// //           <Typography variant="body2" color="textSecondary">
// //             {dayjs(createdAt).format("h:mm: a, MMMM DD YYYY")}
// //           </Typography>
// //           <hr className={classes.invisibleSeparator} />
// //           <Typography variant="body1"> {body} </Typography>
// //           <LikeButton screamId={screamId} />
// //           <span>{likeCount} Likes </span>
// //           <CustomButton tip="comments">
// //             <ChatRoundedIcon color="primary" />
// //           </CustomButton>
// //           <span>{commentCount} Comments</span>
// //         </Grid>
// //       </Grid>
// //     );

// //     return (
// //       <Fragment>
// //         <CustomButton
// //           onClick={this.handleOpen}
// //           tip="See Post Details"
// //           tipClassName={classes.expandButton}
// //         >
// //           <UnfoldMoreIcon color="primary" />
// //         </CustomButton>
// //         <Dialog
// //           open={this.state.open}
// //           onClose={this.handleClose}
// //           fullWidth
// //           maxWidth="sm"
// //         >
// //           <CustomButton
// //             tip="Close"
// //             onClick={this.handleClose}
// //             tipClassName={classes.closeButton}
// //           >
// //             <CloseIcon />
// //           </CustomButton>
// //           <DialogContent className={classes.dialogContent}>
// //             {dialogMarkup}
// //           </DialogContent>
// //         </Dialog>
// //       </Fragment>
// //     );
// //   }
// // }

// // PostDialog.propTypes = {
// //   getPost: PropTypes.func.isRequired,
// //   screamId: PropTypes.string.isRequired,
// //   userHandle: PropTypes.string.isRequired,
// //   scream: PropTypes.object.isRequired,
// //   UI: PropTypes.object.isRequired
// // };

// // const mapStateToProps = state => ({
// //   scream: state.data.scream,
// //   UI: state.UI
// // });

// // const mapActionsToProps = {
// //   getPost
// // };

// // export default connect(
// //   mapStateToProps,
// //   mapActionsToProps
// // )(withStyles(styles)(PostDialog));

// import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
// import withStyles from '@material-ui/core/styles/withStyles';
// import CustomButton from '../../utilities/CustomButton';
// import LikeButton from './LikeButton';
// import Comments from './Comments';
// import CommentForm from './CommentForm';
// import dayjs from 'dayjs';
// import { Link } from 'react-router-dom';
// // MUI Stuff
// import Dialog from '@material-ui/core/Dialog';
// import DialogContent from '@material-ui/core/DialogContent';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// // Icons
// import CloseIcon from '@material-ui/icons/Close';
// import UnfoldMore from '@material-ui/icons/UnfoldMore';
// import ChatIcon from '@material-ui/icons/Chat';
// // Redux stuff
// import { connect } from 'react-redux';
// import { getPost, clearErrors } from '../../redux/actions/dataActions';

// const styles = (theme) => ({
//   ...theme.spreadThis,
//   profileImage: {
//     maxWidth: 200,
//     height: 200,
//     borderRadius: '50%',
//     objectFit: 'cover'
//   },
//   dialogContent: {
//     padding: 20
//   },
//   closeButton: {
//     position: 'absolute',
//     left: '90%'
//   },
//   expandButton: {
//     position: 'absolute',
//     left: '90%'
//   },
//   spinnerDiv: {
//     textAlign: 'center',
//     marginTop: 50,
//     marginBottom: 50
//   }
// });

// class PostDialog extends Component {
//   state = {
//     open: false,
//     oldPath: '',
//     newPath: ''
//   };
//   componentDidMount() {
//     if (this.props.openDialog) {
//       this.handleOpen();
//     }
//   }
//   handleOpen = () => {
//     let oldPath = window.location.pathname;

//     const { userHandle, screamId } = this.props;
//     const newPath = `/users/${userHandle}/scream/${screamId}`;

//     if (oldPath === newPath) oldPath = `/users/${userHandle}`;

//     window.history.pushState(null, null, newPath);

//     this.setState({ open: true, oldPath, newPath });
//     this.props.getPost(this.props.screamId);
//   };
//   handleClose = () => {
//     window.history.pushState(null, null, this.state.oldPath);
//     this.setState({ open: false });
//     this.props.clearErrors();
//   };

//   render() {
//     const {
//       classes,
//       scream: {
//         screamId,
//         body,
//         createdAt,
//         likeCount,
//         commentCount,
//         userImage,
//         userHandle,
//         comments
//       },
//       UI: { loading }
//     } = this.props;

//     const dialogMarkup = loading ? (
//       <div className={classes.spinnerDiv}>
//         <CircularProgress size={200} thickness={2} />
//       </div>
//     ) : (
//       <Grid container spacing={16}>
//         <Grid item sm={5}>
//           <img src={userImage} alt="Profile" className={classes.profileImage} />
//         </Grid>
//         <Grid item sm={7}>
//           <Typography
//             component={Link}
//             color="primary"
//             variant="h5"
//             to={`/users/${userHandle}`}
//           >
//             @{userHandle}
//           </Typography>
//           <hr className={classes.invisibleSeparator} />
//           <Typography variant="body2" color="textSecondary">
//             {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
//           </Typography>
//           <hr className={classes.invisibleSeparator} />
//           <Typography variant="body1">{body}</Typography>
//           <LikeButton screamId={screamId} />
//           <span>{likeCount} likes</span>
//           <CustomButton tip="comments">
//             <ChatIcon color="primary" />
//           </CustomButton>
//           <span>{commentCount} comments</span>
//         </Grid>
//         <hr className={classes.visibleSeparator} />
//         <CommentForm screamId={screamId} />
//         <Comments comments={comments} />
//       </Grid>
//     );
//     return (
//       <Fragment>
//         <CustomButton
//           onClick={this.handleOpen}
//           tip="Expand scream"
//           tipClassName={classes.expandButton}
//         >
//           <UnfoldMore color="primary" />
//         </CustomButton>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           fullWidth
//           maxWidth="sm"
//         >
//           <CustomButton
//             tip="Close"
//             onClick={this.handleClose}
//             tipClassName={classes.closeButton}
//           >
//             <CloseIcon />
//           </CustomButton>
//           <DialogContent className={classes.dialogContent}>
//             {dialogMarkup}
//           </DialogContent>
//         </Dialog>
//       </Fragment>
//     );
//   }
// }

// PostDialog.propTypes = {
//   clearErrors: PropTypes.func.isRequired,
//   getPost: PropTypes.func.isRequired,
//   screamId: PropTypes.string.isRequired,
//   userHandle: PropTypes.string.isRequired,
//   scream: PropTypes.object.isRequired,
//   UI: PropTypes.object.isRequired
// };

// const mapStateToProps = (state) => ({
//   scream: state.data.scream,
//   UI: state.UI
// });

// const mapActionsToProps = {
//   getPost,
//   clearErrors
// };

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(withStyles(styles)(PostDialog));


import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CustomButton from '../../utilities/CustomButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
// Redux stuff
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes</span>
          <CustomButton tip="comments">
            <ChatIcon color="primary" />
          </CustomButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <CustomButton
          onClick={this.handleOpen}
          tip="Expand Post"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
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
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI
});

const mapActionsToProps = {
  getPost,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));