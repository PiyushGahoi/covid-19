import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function DetailedAccordion(props) {
  const classes = useStyles();
  const { request } = props;
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>Type</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Authorised Hospital</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>Contact</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>City</Typography>
          </div>
          <div className={classes.column}/>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            {request?.type}
          </div>
          <div className={classes.column}>
          {request?.hospital.name}
          </div>
          <div className={classes.column}>
          {request?.contact}
          </div>
          <div className={classes.column}>
          {request?.city}
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
            {request?.details}
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Mark Complete</Button>
          <Button size="small" color="primary" onClick={props.setEditing}>
            Edit
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
