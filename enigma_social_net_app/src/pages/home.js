import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

//component
import Post from "../components/Post";
class home extends Component {
  state = {
    screams: null
  };

  componentDidMount() {
    axios
      .get("/screams")
      .then(result => {
        console.log(result.data);
        this.setState({ screams: result.data });
      })
      .catch(error => console.log(error));
  }
  render() {
    let recentPost = this.state.screams ? (
      this.state.screams.map(posts => <Post key={posts.screamId} scream={posts}></Post>)
    ) : (
      <p>Loading...</p>
    );
    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {recentPost}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profile...</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
