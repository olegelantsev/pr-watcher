import {
  RECEIVE_PULL_REQUESTS,
  REQUEST_PULL_REQUESTS,
  UPDATE_ACCOUNT,
  PullRequestActions,
  PullRequests
} from './types';

const initialState = {
  fetchInProgress: false,
  newPullRequests: 0,
  prs: []
} as PullRequests;

export default function pullRequests(
  state: PullRequests = initialState,
  action: PullRequestActions
): PullRequests {
  switch (action.type) {
    case RECEIVE_PULL_REQUESTS:
      return {
        ...state,
        fetchInProgress: false
      };
    case REQUEST_PULL_REQUESTS:
      return {
        ...state,
        fetchInProgress: true
      };
    case UPDATE_ACCOUNT:
      return {
        ...state
      };
    default:
      return state;
  }
}
