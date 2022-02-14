import {
    SET_POSTS,
    LIKE_POST,
    UNLIKE_POST,
    LOADING_DATA,
    DELETE_POST,
    POST_POST,
    SET_POST,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    screams: [],
    scream: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_POSTS:
        return {
          ...state,
          screams: action.payload,
          loading: false
        };
      case SET_POST:
        return {
          ...state,
          scream: action.payload
        };
      case LIKE_POST:
      case UNLIKE_POST:
        let index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload.screamId
        );
        state.screams[index] = action.payload;
        if (state.scream.screamId === action.payload.screamId) {
          state.scream = action.payload;
        }
        return {
          ...state
        };
      case DELETE_POST:
        index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload
        );
        state.screams.splice(index, 1);
        return {
          ...state
        };
      case POST_POST:
        return {
          ...state,
          screams: [action.payload, ...state.screams]
        };
      case SUBMIT_COMMENT:
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments]
          }
        };
      default:
        return state;
    }
  }