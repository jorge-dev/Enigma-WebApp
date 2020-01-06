import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CustomButton from "../utilities/CustomButton";


//Material Ui
import  Button  from "@material-ui/core/Button";
import  Dialog  from "@material-ui/core/Dialog";
import  DialogTitle  from "@material-ui/core/DialogTitle";
import  DialogActions from "@material-ui/core/DialogActions";

//icons
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

//redux
import { connect } from "react-redux";
import {deletePost} from '../redux/actions/dataActions'

const styles= {

}

 class DeletePost extends Component {
     state={
         open:false
     }

     handleOpen = () =>{
         this.setState({open:true})
     }

     handleClose = () => {
        this.setState({open:false})
     }

    deleteCurrentPost= () => {
        this.props.deletePost(this.props.screamId);
        this.setState({open:false})

    }

    render() {
        const {classes} =this.props;

        return (
            <Fragment>
                <CustomButton tip="Delete Post" onClick={this.handleOpen} btnClassName={classes.deleteButton }>
                    <BackspaceOutlinedIcon color='error'/>
                </CustomButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'>
                    <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>Cancel</Button>
                        <Button onClick={this.deleteCurrentPost} color='inherit'>Delete</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes ={
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null,{deletePost})(withStyles(styles)(DeletePost))
