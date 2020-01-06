import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";
import PropTypes from "prop-types";
import CustomButton from "../../utilities/CustomButton";
import DeletePost from "./DeletePost";
import PostDialog from './PostDialog'

//Material Ui
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TableFooter } from "@material-ui/core";

// icons
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 100,
    minHeight: 75
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};
class Post extends Component {
  likedPost = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.screamId === this.props.scream.screamId
      )
    )
      return true;
    else return false;
  };
  likePost = () => {
    this.props.likePost(this.props.scream.screamId);
  };
  unlikePost = () => {
    this.props.unlikePost(this.props.scream.screamId);
  };
  render() {
    dayjs.extend(relativeTime);

    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <CustomButton tip="Like">
          <FavoriteBorderOutlinedIcon color="primary" />
        </CustomButton>
      </Link>
    ) : this.likedPost() ? (
      <CustomButton tip="Undo like" onClick={this.unlikePost}>
        <FavoriteOutlinedIcon color="error" />
      </CustomButton>
    ) : (
      <CustomButton tip="Like" onClick={this.likePost}>
        <FavoriteBorderOutlinedIcon color="primary" />
      </CustomButton>
    );

    const deletePost =
      authenticated && userHandle === handle ? (
        <DeletePost screamId={screamId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile Picture"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deletePost}

          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <CustomButton tip="comments">
            <ChatRoundedIcon color="primary" />
          </CustomButton>
          <span>{commentCount} Comments</span>
          <PostDialog
            screamId={screamId}
            userHandle={userHandle}
          />
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionstoProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionstoProps
)(withStyles(styles)(Post));
