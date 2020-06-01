import * as H from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Diff } from 'utility-types';
import { AccountSetting, ApplicationState } from '../reducers/types';

function mapStateToProps(state: ApplicationState) {
  return {
    accountSetting: state.accountSetting
  };
}

type Props = {
  accountSetting?: AccountSetting;
};

type Props2 = {};

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location, accountSetting }) =>
//         accountSetting !== null ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/setup',
//               state: { from: location }
//             }}
//           />
//         )}
//     />
//   );
// }

// class WrappedComponent extends React.Component<
//   P & { dispatch?: ({}) => void }
// > {
//   public render() {
//     return <Comp {...this.props} />;
//   }
// }

// export type WrapperProps = { specialProp?: string };
// const Wrapper = <P extends WrapperProps>(
//   WrappedComponent: React.ComponentType<P>
// ): React.FunctionComponent<P> => {
//   const Wrapper2 = (props: P) => {
//     // eslint-disable-next-line react/jsx-props-no-spreading
//     return <WrappedComponent {...props} />;
//   };

//   return Wrapper2;
// };

// const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
//   // eslint-disable-next-line react/prefer-stateless-function
//   class WithLoading extends React.Component<P & Props> {
//     render() {
//       const { accountSetting, location, ...props } = this.props;
//       return accountSetting ? (
//         // eslint-disable-next-line react/jsx-props-no-spreading
//         <Component {...(props as P)} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/setup',
//             state: { from: location }
//           }}
//         />
//       );
//     }
//   };

const withConnectedCount = <BaseProps extends Props2>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  // type HocProps = ReturnType<typeof mapStateToProps> & {
  //   // here you can extend ConnectedHoc with new props
  //   overrideCount?: number;
  // } & {
  //   location: H.Location;
  // };

  class Hoc extends React.Component<Props> {
    // Enhance component name for debugging and React-Dev-Tools
    // eslint-disable-next-line react/static-property-placement
    static displayName = `withConnectedCount(${BaseComponent.name})`;

    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    render() {
      const { accountSetting, location, ...restProps } = this.props;

      return accountSetting !== null ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <BaseComponent {...(restProps as BaseProps)} />
      ) : (
        <Redirect
          to={{
            pathname: '/setup'
          }}
        />
      );
    }
  }

  const ConnectedHoc = connect<
    ReturnType<typeof mapStateToProps>,
    null,
    Diff<BaseProps, Props>,
    ApplicationState
  >(
    mapStateToProps,
    null
  )(Hoc);

  return ConnectedHoc;
};

// export Hoc;
// export default connect(mapStateToProps, null)(withLoading);
export default withConnectedCount;
