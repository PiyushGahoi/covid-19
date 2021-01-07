import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { Link } from '@material-ui/core';

// import PlanForm from './PlanForm';
// import PlanAssignmentForm from './PlanAssignmentForm';

import Actions from '../actions';
import LoginModal from './LoginModal';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      background: '#f3f3f3',
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      background: '#fc3c3c',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    tab: {
      label: {
        background: '#aa0',
        fontSize: '22px',
      },
    },
  };
});
function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setdialog] = React.useState(false);
  // const [value, setValue] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const logout = () => {
    props.logout();
  };

  const opendialog = () =>{
    setdialog(true);
  }

  const closeDialog = () =>{
    setdialog(false);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ background: '#fc3c3c' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <Link href="/" variant="inherit" color="inherit" style={{ textDecoration: 'none' }}>
              COVID-19 Tracker
            </Link>
          </Typography>
          <div style={{ marginLeft: 'auto' }}>
          {props.auth.isAuthenticated?
            <Button color="inherit" onClick={() => { return logout(); }}>Logout</Button>
            : <Button color="inherit" onClick={ opendialog }>LogIn</Button>}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/" color="inherit" variant="inherit" style={{ textDecoration: 'none' }}>
            <ListItem button key="Template">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" color="#fff"/>
            </ListItem>
          </Link>
          <Link href="/user/requests" color="inherit" variant="inherit" style={{ textDecoration: 'none' }}>
            <ListItem button key="Template">
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary="My Requests" color="#fff"/>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        style={{ background: '#f4f4f4', minHeight: '100vh' }}
      >
        <div style={{marginTop: '5vh'}}>
          {dialogOpen
          ? <LoginModal closeDialog={closeDialog}/>
          : null}
          {props.children}
        </div>
      </main>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersistentDrawerLeft);
