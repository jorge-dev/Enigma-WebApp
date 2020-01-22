import React, { Component } from 'react'
import Typography  from "@material-ui/core/Typography";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";


const styles ={
    root:{
        backgroundColor: '#1976D2',
        color:'white',
        boxShadow: '1px 0px 18px #888888'
    }
}

export class Footer extends Component {
    render() {
        const {classes} = this.props
        return (
            <BottomNavigation className={classes.root}>
            <Typography align='center' className ="footer"> &#169; Enigma Social Network Created by <a className="jorgeLink" href="https://github.com/jorge-dev" target='_blank'>Jorge Avila</a></Typography>
            </BottomNavigation>
        )
    }
}


Footer.propTypes = {

    classes: PropTypes.object.isRequired,
   
  };
  
 
  
  export default withStyles(styles)(Footer);

