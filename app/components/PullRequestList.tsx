import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { PullRequests, PullRequest } from '../reducers/types';
import styles from './PullRequestList.css';

const { shell } = require('electron');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    root2: {
      margin: '10px'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
      border: 0
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%'
    }
  })
);

type ItemProps = {
  pr: PullRequest;
};

function ComplexGrid(props: ItemProps) {
  const classes = useStyles();

  const { pr } = props;

  const openUrl = () => {
    shell.openExternal('http://www.google.com');
  };

  return (
    <div key={`${pr.link}div-root`} className={classes.root}>
      <div className={classes.root2}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Button className={classes.image} onClick={openUrl}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://material-ui.com/static/images/grid/complex.jpg"
                />
              </Button>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                    {pr.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {pr.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {pr.author.displayName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ cursor: 'pointer' }}>
                    Remove
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

type Props = {
  pullRequests: PullRequests;
  fetchAll: () => void;
};

export default function Counter(props: Props) {
  const { pullRequests } = props;
  const { error } = pullRequests;
  if (error !== undefined) {
    return <p>{error}</p>;
  }

  const elements = pullRequests.prs.map((x: PullRequest) => {
    return (
      <div key={x.link}>
        <ComplexGrid key={`${x.link}ds`} pr={x} />
      </div>
    );
  });

  const loadFunc = () => {
    return elements;
  };

  if (pullRequests.prs.length === 0) {
    return <h2>No PRs found.</h2>;
  }

  return (
    <div className={styles.container}>
      <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore>
        {elements}
      </InfiniteScroll>
    </div>
  );
}
