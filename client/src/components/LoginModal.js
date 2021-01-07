import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import UserForm from './User/Form';
import HospitalForm from './Hospital/Form';


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    maxHeight: '100vh',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
    minWidth: 500,
  },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
        {children}
        </div>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

export default function LoginModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
    props.closeDialog();
  };

  const body = (
    <div className={classes.paper}>
      <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<PersonPinIcon />} label="USER" />
        <Tab icon={<LocalHospitalIcon />} label="HOSPITAL"/>
      </Tabs>
      <TabPanel value={value} index={0} {...a11yProps(0)}>
        <UserForm closeModal={handleClose}/>
      </TabPanel>
      <TabPanel value={value} index={1} {...a11yProps(1)}>
        <HospitalForm closeModal={handleClose}/>
      </TabPanel>
    </Paper>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
