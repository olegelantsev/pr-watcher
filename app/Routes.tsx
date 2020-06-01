import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import PullRequestsPage from './containers/PullRequestsPage';
import AccountSettingPage from './containers/AccountSettingPage';

// const Wrapped = Hoc(PullRequestsPage);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.PULL_REQUESTS} component={PullRequestsPage} />
        <Route path={routes.SETUP} component={AccountSettingPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
