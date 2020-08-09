import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AccountSetting, ApplicationState } from '../reducers/types';

function mapStateToProps(state: ApplicationState) {
  return {
    accountSetting: state.accountSetting
  };
}

interface BaseProps extends RouteProps {
  accountSetting?: AccountSetting;
  children: JSX.Element;
}

export const FCSpreadAttributes: React.FC<BaseProps> = props => {
  // eslint-disable-next-line react/prop-types
  const { children, accountSetting, ...restProps } = props;
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(restProps as BaseProps)}
      render={({ location }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        return accountSetting !== null ? (
          children
        ) : (
          <Redirect to={{ pathname: '/setup', state: { from: location } }} />
        );
      }}
    />
  );
  // // eslint-disable-next-line react/jsx-props-no-spreading
  // return <div {...restProps}>{children}</div>;
};

export default connect(mapStateToProps)(FCSpreadAttributes);
