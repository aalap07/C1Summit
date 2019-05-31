import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function SimpleExpansionPanel({ parkCode, alerts, desc, visitors, grounds }) {
  const classes = useStyles();
  var alertsEmpty = alerts.length === 0;
  var groundsEmpty = grounds.length === 0;
  var centersEmpty = visitors.length === 0;


  return (
    <div className={classes.root}>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Description</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {/* <p>{desc}</p>  */}


          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Visitor Info</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <p align="left"><strong>Visitor Centers:</strong></p>
            {visitors.map(v => (
              <p><li>{v.description}</li></p>
            ))}
                        <p>{(centersEmpty ? "There are no visitor centers :(." : "")}</p>
  <hr/>
            <p align="left"><strong>Nearby Campgrounds:</strong></p>
            {grounds.map(g => (
              <p><li>{g.description}</li></p>
            ))}
            <p align="left">{(groundsEmpty ? "There are no nearby campgrounds :(." : "")}</p>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Significant Information</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>

            <p align="left"><strong>Alerts:</strong></p>
            {alerts.map(a => (
              <p align="left"><li>{a.description}</li></p>
            ))}

            <p>{(alertsEmpty ? "There are no alerts!" : "")}</p>


            <hr />

          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Learn More</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nothing yet
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>




    </div>
  );
}

export default SimpleExpansionPanel;