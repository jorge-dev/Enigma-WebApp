import React, { Component } from 'react'
import CustomButton from "../../utilities/CustomButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

//Redux
import { connect } from "react-redux";

//Icons
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";



 class LikeButton extends Component {

    likedPost = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            like => like.screamId === this.props.screamId
          )
        )
          return true;
        else return false;
      };
      likePost = () => {
        this.props.likePost(this.props.screamId);
      };
      unlikePost = () => {
        this.props.unlikePost(this.props.screamId);
      };

    render() {
        const {authenticated} = this.props.user;
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
        return likeButton
    }
}

LikeButton.propTypes ={
    user: PropTypes.object.isRequired,
    screamId: PropTypes.object.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
  });

  const mapActionstoProps = {
    likePost,
    unlikePost
  };

export default connect(
    mapStateToProps,mapActionstoProps
  )(LikeButton);
