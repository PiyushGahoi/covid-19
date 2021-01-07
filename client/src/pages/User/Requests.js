import React, { Component } from 'react';
import {
  withStyles, CssBaseline, Button,  Switch,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Actions from '../../actions';
import DetailedAccordion from '../../components/DetailedAccordion';
import RequestForm from '../../components/RequestForm';
import RequestEditForm from '../../components/RequestEditForm';

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      width: '100%',
      marginTop: '7vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    createButton: {
      marginRight: theme.spacing(1),
      alignSelf: 'flex-end'
    }
  };
};

class TaskTemplates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 8,
      page: 0,
      block: '',
      editing: false,
      newRequest: false,
    };
  }

  componentDidMount() {
    this.props.getUserRequests();
    this.props.fetchUsers();
    this.props.fetchHospitals();
  }

  setAdding=() => {
    this.setState((prevState) => {
      return { newRequest: !prevState.newRequest };
    });
    this.props.getUserRequests();
  }

  setEditing=(index) => {
    console.log(this.props.requests[index]);
    this.setState((prevState) => {
      return { 
        editing: !prevState.editing,
        editRequest : index!=null?this.props.requests[index]:null,
      };
    });
    this.props.getUserRequests();
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <CssBaseline />
        {this.state.newRequest?
        <RequestForm closeDialog={this.setAdding} />: null}
        {this.state.editing?
        <RequestEditForm closeDialog={this.setEditing} request={this.state.editRequest}/>: null}
        <div className={classes.root}>
          <Button variant="contained" color="secondary" size="large" className={classes.createButton} onClick={this.setAdding}>
            Raise A new Request
          </Button>
          {this.props.requests?.map((request, index)=>{
            return (
          <DetailedAccordion key={request._id} request={request} setEditing={()=>this.setEditing(index)}/>
          );
          })}
        </div>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
  return {
    requests: state.requests.data,
    fetching: state.requests.fetching,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TaskTemplates));
