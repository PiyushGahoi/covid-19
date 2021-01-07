import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Paper, FormControl, TextField, Button,
} from '@material-ui/core';
import Actions from '../../actions';

class HospitalForm extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state={
        email: "",
        password: "",
    };
    formupdated = (e) => {
      e.preventDefault();
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    formSubmitted = (e) => {
      e.preventDefault();
      if(this.state.type === "login"){
          this.props.hospitalSignIn({
              email: this.state.email,
              password: this.state.password,
          }).then(()=>{
            this.props.closeModal();  
            this.props.loadUser();
          });
      }
    }

    resetState() {
      this.setState({
        url: '',
        isRepeat: false,
        isActive: true,
        time: '10:00',
        callType: '',
        duration: 0,
        moderator: '',
      });
    }

    changeType = (type) =>{
        this.setState({type});
    }
    
    getBody = () =>{
        return (
        <>
            <h3 style={{ marginTop: -10, textAlign: 'center' }}>Hospital Login</h3>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
            <TextField id="username" name="userName" label="User Name" value={this.state.userName} onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField id="Password" name="password" label="Password" value={this.state.password} type="password" onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '50px' }}>
                <Button variant="contained" type="submit" color="secondary">Login</Button>
            </FormControl>
            {/* <Typography variant="h6" style={{ marginTop: 0, textAlign: 'center' }}> OR </Typography>
            <FormControl fullWidth >
                <Button color="secondary" onClick={()=>this.changeType("signup")}>New User? Sign Up</Button>
            </FormControl> */}
        </>
        );
    }

    render() {
      return (
        <Paper style={{ width: '500px', padding: '50px' }}>
            <form className="form" onSubmit={this.formSubmitted} autoComplete="off">
                {this.getBody()}
            </form>
        </Paper>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalForm);
