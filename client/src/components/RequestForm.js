import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper,Modal, FormControl,TextField, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import Actions from '../actions';
import {requestSchema} from '../utils/util';


const styles = (theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    flexGrow: 1,
    maxWidth: 550,
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
      width: 500,
  }
});

class RequestModal extends Component{
  constructor(props){
      super(props);
      this.state={
          open: true,
          name: null,
          hospital: null,
          type: "financial",
          city: "",
          contact: "",
          details: "",
      }
  }

  componentDidMount(){
      if(this.props.auth.role==="user")
      this.setState({
          user: this.props.auth.user,
      });
      else if(this.props.auth.role==="hospital")
      this.setState({
          user: this.props.auth.user,
      });
  }

  handleClose = () => {
    this.setState({open: false});
    this.props.closeDialog();
  };

  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value});
  };

  setHospital = (value) => {
    this.setState({hospital : value});
  };

  setUser = (value) => {
    this.setState({user : value});
  };

  formSubmitted = (e) =>{
      e.preventDefault();
      console.log(this.state.user);
      const data = {
          user: this.state.user._id,
          hospital: this.state.hospital?._id,
          city: this.state.city,
          contact: this.state.contact,
          type: this.state.type,
          details: this.state.details,
      }
      console.log(data);
      requestSchema.validate(data)
        .then(() => {
          return this.props.addRequest(data)
            .then(() => {
              alert(`Request Added Successfully!! \n Data: ${JSON.stringify(data)}`);
              this.props.closeDialog();
            });
        })
        .catch((err) => { return alert(err); });
  }

  render(){
  const { classes } = this.props;

  const body = (
    <div className={classes.paper}>
      <Paper square className={classes.root}>
      <h3 style={{ marginTop: 0, textAlign: 'center' }}>Request Form</h3>
        <form className="form" onSubmit={this.formSubmitted} autoComplete="off">
        <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel id="simple-select-blocktype-label">Type</InputLabel>
                <Select
                  labelId="simple-select-blocktype-label"
                  label="Type"
                  id="simple-select-block"
                  value={this.state.type}
                  name="type"
                  onChange={this.handleSizeChange}
                >
                  {
                  ["financial", "medical"].map((type) => { return (<MenuItem key={type} value={type}>{type}</MenuItem>); 
                })
              }
                </Select>
              </FormControl>
            {this.props.auth.role==="user"?
                <FormControl fullWidth style={{ marginTop: '15px' }}  className={classes.formControl}>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.props.hospitals}
                    getOptionLabel={(option) => option.name}
                    value={this.state.hospital}
                    onChange={(event, newValue) => {
                    this.setHospital(newValue);
                    }}
                    disabled={this.props.auth.role === "hospital"}
                    renderInput={(params) => <TextField {...params} label="Hospital" variant="outlined" />}
                    />
                </FormControl>:
                <FormControl fullWidth style={{ marginTop: '15px' }} className={classes.formControl}>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.props.users}
                    getOptionLabel={(option) => option.name}
                    value={this.state.user}
                    onChange={(event, newValue) => {
                    this.setUser(newValue);
                    }}
                    disabled={this.props.auth.role === "user"}
                    renderInput={(params) => <TextField {...params} label="User" variant="outlined" />}
                    />
                </FormControl>
                }
                <FormControl fullWidth style={{ marginTop: '15px' }} className={classes.formControl}>
                    <TextField 
                    variant="outlined"
                    name="city"
                    label="City"
                    value={this.state.city}
                    onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl fullWidth style={{ marginTop: '15px' }} className={classes.formControl}>
                    <TextField 
                    variant="outlined"
                    name="contact"
                    label="Contact"
                    type="number"
                    value={this.state.contact}
                    onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl fullWidth style={{ marginTop: '15px' }} className={classes.formControl}>
                    <TextField 
                    variant="outlined"
                    name="details"
                    label="Details"
                    value={this.state.details}
                    onChange={this.handleChange}
                    />
                </FormControl>
                <FormControl fullWidth style={{ marginTop: '15px' }} className={classes.formControl}>
                    <Button type="submit" variant="contained" color="secondary">Submit</Button>
                </FormControl>

        </form>
    </Paper>
    </div>
  );

  return (
    <div>
      <Modal
        open={this.state.open}
        onClose={this.handleClose}
        border= "none"
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
  }
  
  function mapStateToProps(state) {
    return {
      auth: state.auth,
      hospitals: state.hospitals.data,
      users: state.users.data,
    };
  }
  
  export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RequestModal));