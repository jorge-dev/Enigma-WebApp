import {
    SET_POSTS,
    LOADING_DATA,
    LIKE_POST,
    UNLIKE_POST,
    DELETE_POST,
    SET_ERRORS,
    POST_POST,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_POST,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  
  // Get all screams
  export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/screams')
      .then((res) => {
        dispatch({
          type: SET_POSTS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_POSTS,
          payload: []
        });
      });
  };
  export const getPost = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/scream/${screamId}`)
      .then((res) => {
        dispatch({
          type: SET_POST,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  // Post a scream
  export const postPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/scream', newPost)
      .then((res) => {
        dispatch({
          type: POST_POST,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  // Like a scream
  export const likePost = (screamId) => (dispatch) => {
    axios
      .get(`/scream/${screamId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a scream
  export const unlikePost = (screamId) => (dispatch) => {
    axios
      .get(`/scream/${screamId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_POST,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Submit a comment
  export const submitComment = (screamId, commentData) => (dispatch) => {
    axios
      .post(`/scream/${screamId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const deletePost = (screamId) => (dispatch) => {
    axios
      .delete(`/scream/${screamId}`)
      .then(() => {
        dispatch({ type: DELETE_POST, payload: screamId });
      })
      .catch((err) => console.log(err));
  };
  
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_POSTS,
          payload: res.data.screams
        });
      })
      .catch(() => {
        dispatch({
          type: SET_POSTS,
          payload: null
        });
      });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };