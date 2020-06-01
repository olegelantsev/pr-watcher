import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import PullRequestsPage from './containers/PullRequestsPage';
import AccountSettingPage from './containers/AccountSettingPage';
import WithAccountSetting from './containers/WithAccountSetting';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <WithAccountSetting path={routes.PULL_REQUESTS}>
          <PullRequestsPage />
        </WithAccountSetting>
        <Route path={routes.SETUP} component={AccountSettingPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
