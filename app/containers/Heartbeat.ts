import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchAll } from '../actions/pullRequest';

const period = 60000;

type Props = {
  periodicFunction: () => void;
};

function heartbeat(props: Props) {
  const periodicFinction = () => {
    props.periodicFunction();
    setTimeout(() => {
      periodicFinction();
    }, period);
  };
  periodicFinction();
  return null;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      periodicFunction: fetchAll
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(heartbeat);
