import {
  RECEIVE_PULL_REQUESTS,
  REQUEST_PULL_REQUESTS,
  UPDATE_ACCOUNT,
  PullRequestActions,
  PullRequests,
  PullRequest,
  RESET_NEW_PR_COUNT
} from './types';

const initialState = {
  fetchInProgress: false,
  newPullRequests: 0,
  prs: [],
  status: 'success'
} as PullRequests;

function countNewPrs(
  source: Array<PullRequest>,
  destination: Array<PullRequest>
) {
  const sourceSet = new Set(source.map(x => x.link));
  const destinationSet = new Set(destination.map(x => x.link));
  if (destinationSet.size > sourceSet.size) {
    return destinationSet.size - sourceSet.size;
  }
  return 0;
}

export default function pullRequests(
  state: PullRequests = initialState,
  action: PullRequestActions
): PullRequests {
  switch (action.type) {
    case RECEIVE_PULL_REQUESTS:
      return {
        ...state,
        fetchInProgress: false,
        prs: action.pullRequests,
        error: action.error,
        status: action.status,
        newPullRequests:
          state.newPullRequests === 0
            ? countNewPrs(state.prs, action.pullRequests)
            : state.newPullRequests
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
    case RESET_NEW_PR_COUNT:
      return {
        ...state,
        newPullRequests: 0
      }
    default:
      return state;
  }
}
