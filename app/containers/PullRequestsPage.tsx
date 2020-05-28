import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PullRequestList from '../components/PullRequestList';
import { fetchAll } from '../actions/pullRequest';
import { ApplicationState } from '../reducers/types';

function mapStateToProps(state: ApplicationState) {
  return {
    pullRequests: state.pullRequests
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      fetchAll
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PullRequestList);
