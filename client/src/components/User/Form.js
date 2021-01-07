import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Paper, FormControl, TextField, Button, InputLabel, Select, MenuItem, Typography,
} from '@material-ui/core';
import Actions from '../../actions';

class UserForm extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state={
        type: "login",
        name: "",
        email: "",
        password: "",
        blood: "",
        gender: "",
        city: "",
    };
    formupdated = (e) => {
      e.preventDefault();
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    formSubmitted = (e) => {
      e.preventDefault();
      if(this.state.type === "login"){
          this.props.userSignIn({
              email: this.state.email,
              password: this.state.password,
          }).then(()=>{
            this.props.closeModal();  
            this.props.loadUser();
          });
      }
      else{
          const data = {
              name: this.state.name,
              email: this.state.email,
              password: this.state.password,
              blood: this.state.blood,
              gender: this.state.gender,
              city: this.state.city
          }
          this.props.userSignup(data).then(()=>{
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
        const BLOOD_TYPES=['A+','A-','B+','B-','AB+','AB-',"O+",'O-']
        return (
        <>
        {this.state.type == "login"?
        <>
            <h3 style={{ marginTop: -10, textAlign: 'center' }}>User Login</h3>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
            <TextField id="email" name="email" label="Email" value={this.state.email} onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField id="Password" name="password" label="Password" value={this.state.password} type="password" onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '50px' }}>
                <Button variant="contained" type="submit" color="secondary">Login</Button>
            </FormControl>
            <Typography variant="h6" style={{ marginTop: 0, textAlign: 'center' }}> OR </Typography>
            <FormControl fullWidth >
                <Button color="secondary" onClick={()=>this.changeType("signup")}>New User? Sign Up</Button>
            </FormControl>
        </>
        :
        <>
            <h3 style={{ marginTop: -10, textAlign: 'center' }}>User Signup</h3>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
            <TextField id="name" name="name" label="Name" value={this.state.name} onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
            <TextField id="email" name="email" label="Email" value={this.state.email} onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField id="Password" name="password" label="Password" value={this.state.password} type="password" onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField id="city" name="city" label="City" value={this.state.city} onChange={(e) => { this.formupdated(e); }} />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
                <InputLabel id="simple-select-active-label">Blood Group</InputLabel>
                <Select
                labelId="simple-select-active-label"
                id="simple-select-active"
                value={this.state.blood}
                name="blood"
                onChange={(e) => { return this.formupdated(e); }}
                style={{ textAlign: 'left' }}
                >
                <MenuItem value="">
                    None
                </MenuItem>
                {BLOOD_TYPES.map((type)=>(
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '15px' }}>
                <InputLabel id="simple-select-active-label">Gender</InputLabel>
                <Select
                labelId="simple-select-active-label"
                id="simple-select-active"
                value={this.state.gender}
                name="gender"
                onChange={(e) => { return this.formupdated(e); }}
                style={{ textAlign: 'left' }}
                >
                <MenuItem value="male">
                    Male
                </MenuItem>
                <MenuItem value="female">
                    Female
                </MenuItem>
                <MenuItem value="other">
                    Other
                </MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '50px' }}>
                <Button variant="contained" type="submit" color="secondary">SignUp</Button>
            </FormControl>
            <Typography variant="h6" style={{ marginTop: 0, textAlign: 'center' }}> OR </Typography>
            <FormControl fullWidth >
                <Button color="secondary" onClick={()=>this.changeType("login")}>Existing User? Login</Button>
            </FormControl>
        </>
    }
        </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
