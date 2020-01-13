import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../redux/actions/dataActions'

//component
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";

class home extends Component {
  

  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { screams,loading} =this.props.data
    let recentPost = !loading ? (
      screams.map(posts => 
        <Post key={posts.screamId} scream={posts}></Post>
      )
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={4} xs={12}>
           <Profile/>
        </Grid>
        <Grid item sm={8} xs={12}>
        {recentPost}
        </Grid>
      </Grid>
    );
  }
}

home.propTypes ={
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps, {getPosts})(home);
