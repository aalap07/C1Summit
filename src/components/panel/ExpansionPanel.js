import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import style from './panel.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function SimpleExpansionPanel({ alerts, desc, visitors, grounds, articles, events, news }) {
  const classes = useStyles();
  var alertsEmpty = alerts.length === 0;
  var groundsEmpty = grounds.length === 0;
  var centersEmpty = visitors.length === 0;
  var articlesEmpty = articles.length === 0;
  var lotsOfArticles = articles.length > 10;
  var eventsEmpty = events.length === 0;
  var newsEmpty = news.length === 0;


  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Overview</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          <div className={style.infoPanel}> 

            <p align="left">{desc}</p>
    </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>While You're There</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <p align="left"><strong>Visitor Centers:</strong></p>
            {visitors.map(v => (
              <p align="left"><li>{v.description}</li></p>
            ))}
            <p>{(centersEmpty ? "There are no visitor centers :(." : "")}</p>
            <hr />
            <p align="left"><strong>Nearby Campgrounds:</strong></p>
            {grounds.map(g => (
              <p><li>{g.description}</li></p>
            ))}
            <p align="left">{(groundsEmpty ? "There are no nearby campgrounds :(." : "")}</p>
            
            <hr />

            <p align="left"><strong>Events:</strong></p>

            {events.map(eve => (
              <p align="left"> <li>{eve.description}</li> </p>
            ))}
            <p align="left">{(eventsEmpty ? "There are no events :(." : "")}</p>



          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Things to Know</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>

            <p align="left"><strong>Alerts:</strong></p>
            {alerts.map(a => (
              <p align="left"><li>{a.description}</li></p>
            ))}

            <p align="left">{(alertsEmpty ? "There are no alerts!" : "")}</p>

            <hr />

            <p align="left"><strong>Articles: {(lotsOfArticles ? " (Top 5)" : "")}</strong></p>

            {articles.map(art => (
              <p align="left"><li><a href={art.url} target="_blank">{art.title}</a></li></p>
            ))}

            <p align="left">{(articlesEmpty ? "There are no articles :(." : "")}</p>


            <hr />



            <p align="left"><strong>News:</strong></p>

            {news.map(n => (
              <p align="left"><li><a href={n.url} target="_blank">{n.title}</a></li></p>))}
            <p align="left">{(eventsEmpty ? "There is no news :(." : "")}</p>




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