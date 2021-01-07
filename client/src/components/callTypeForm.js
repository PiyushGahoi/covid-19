import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  Paper, FormControl, TextField, Button, InputLabel, Select, MenuItem,
} from '@material-ui/core';
import { callTypeValidationSchema } from '../utils/util';
import Drawer from './Drawer';
import Actions from '../actions';

class CallTypeForm extends Component {
    // eslint-disable-next-line react/state-in-constructor
    state={
      name: '',
      title: '',
      description: '',
      maxParticipants: 1,
      platform: 'web',
      img: '',
      shareText: '',
      shareImg: '',
      groupCallImageUrl: '',
      upcomingCallImageUrl: '',
    };

    formupdated = (e) => {
      e.preventDefault();
      // eslint-disable-next-line react/no-access-state-in-setstate
      this.setState({ ...this.state, [e.target.name]: e.target.value });
    }

    formSubmitted = (e) => {
      e.preventDefault();
      const data = {
        name: this.state.name,
        title: this.state.title,
        description: this.state.description,
        maxParticipants: this.state.maxParticipants,
        platform: this.state.platform,
        img: this.state.img,
        shareText: this.state.shareText,
        shareImg: this.state.shareImg,
        groupCallImageUrl: this.state.groupCallImageUrl,
        upcomingCallImageUrl: this.state.upcomingCallImageUrl,
      };
        // alert(JSON.stringify(data));
      callTypeValidationSchema.validate(data)
        .then(() => {
          return this.props.addCallType(data)
            .then(() => {
              alert(`Call Type Added Successfully!! \n Data: ${JSON.stringify(data)}`);
              this.resetState();
            });
        })
        .catch((err) => { return alert(err); });
    }

    resetState() {
      this.setState({
        name: '',
        title: '',
        description: '',
        maxParticipants: 1,
        platform: '',
        img: '',
        shareText: '',
        shareImg: '',
        groupCallImageUrl: '',
        upcomingCallImageUrl: '',
      });
    }

    render() {
      return (
        <Drawer>
          <Paper style={{ width: '500px', padding: '50px', marginTop: 20 }}>
            <h3 style={{ marginTop: 0 }}>Call Type Form</h3>
            <form className="form" onSubmit={this.formSubmitted} autoComplete="off">
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField id="name" name="name" label="Name" value={this.state.name} onChange={(e) => { this.formupdated(e); }} />
              </FormControl>
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField id="title" name="title" label="Title" value={this.state.title} onChange={(e) => { this.formupdated(e); }} />
              </FormControl>
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  value={this.state.description}
                  onChange={(e) => { this.formupdated(e); }}
                />
              </FormControl>
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField type="url" id="img" name="img" label="Image Url" value={this.state.img} onChange={(e) => { this.formupdated(e); }} />
              </FormControl>
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField
                  id="shareText"
                  name="shareText"
                  label="Share Text"
                  value={this.state.shareText}
                  onChange={(e) => { this.formupdated(e); }}
                />
              </FormControl>
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField id="shareImg" name="shareImg" label="Share Image" value={this.state.shareImg} onChange={(e) => { this.formupdated(e); }} />
              </FormControl>
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField
                  id="groupCallImageUrl"
                  name="groupCallImageUrl"
                  label="Group Call Image Url"
                  value={this.state.groupCallImageUrl}
                  onChange={(e) => { this.formupdated(e); }}
                />
              </FormControl>
              <FormControl fullWidth style={{ marginTop: '15px' }}>
                <TextField
                  id="upcomingCallImageUrl"
                  name="upcomingCallImageUrl"
                  label="Upcoming Call Image Url"
                  value={this.state.upcomingCallImageUrl}
                  onChange={(e) => { this.formupdated(e); }}
                />
              </FormControl>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormControl style={{ marginTop: '15px', width: 150 }}>
                  <TextField
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    label="Max. Participants"
                    value={this.state.maxParticipants}
                    onChange={(e) => { this.formupdated(e); }}
                  />
                </FormControl>
                <FormControl style={{ marginTop: '15px', width: 150 }}>
                  <InputLabel id="simple-select-platform-label">Platform</InputLabel>
                  <Select
                    labelId="simple-select-platform-label"
                    id="simple-select-platform"
                    value={this.state.platform}
                    name="platform"
                    onChange={(e) => { return this.formupdated(e); }}
                    style={{ textAlign: 'left' }}
                  >
                    <MenuItem value="mobile">
                      Mobile
                    </MenuItem>
                    <MenuItem value="web">
                      Web
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <FormControl fullWidth style={{ marginTop: '50px' }}>
                <Button variant="contained" type="submit" color="primary">Submit</Button>
              </FormControl>
            </form>
          </Paper>
        </Drawer>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default withRouter(connect(() => { return {}; }, mapDispatchToProps)(CallTypeForm));
