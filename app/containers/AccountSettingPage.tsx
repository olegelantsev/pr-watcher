import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import AccountSetting from '../components/AccountSetting';
import { ApplicationState } from '../reducers/types';
import { checkAndUpdateAccount } from '../actions/account';

function mapStateToProps(state: ApplicationState) {
  return {
    pullRequests: state.pullRequests
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      checkAndUpdateAccount
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
