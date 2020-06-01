import pullRequestReducer from '../../app/reducers/pullRequest';
import {
  ReceivePullRequestsAction,
  PullRequest,
  PullRequests,
  RECEIVE_PULL_REQUESTS,
  RESET_NEW_PR_COUNT,
  ResetNewPrCount
} from '../../app/reducers/types';

describe('reducers', () => {
  describe('pullRequests', () => {
    it('should set badge count to non-zero if it was zero', () => {
      const state = {
        prs: [],
        newPullRequests: 0
      } as PullRequests;

      const action = {
        type: RECEIVE_PULL_REQUESTS,
        pullRequests: [{} as PullRequest],
        status: 'success'
      } as ReceivePullRequestsAction;
      const newState = pullRequestReducer(state, action);

      expect(newState.newPullRequests).toEqual(1);
    });

    it('should not change badge count if it is already non-zero', () => {
      const state = {
        prs: [{ link: 'http://example.com/1' } as PullRequest],
        newPullRequests: 1
      } as PullRequests;

      const action = {
        type: RECEIVE_PULL_REQUESTS,
        pullRequests: [
          { link: 'http://example.com/1' } as PullRequest,
          { link: 'http://example.com/2' } as PullRequest,
          { link: 'http://example.com/3' } as PullRequest
        ],
        status: 'success'
      } as ReceivePullRequestsAction;
      const newState = pullRequestReducer(state, action);

      expect(newState.newPullRequests).toEqual(1);
    });

    it('should set badge count to zero', () => {
      const state = {
        prs: [
          { link: 'http://example.com/1' } as PullRequest,
          { link: 'http://example.com/2' } as PullRequest
        ],
        newPullRequests: 2
      } as PullRequests;

      const action = {
        type: RESET_NEW_PR_COUNT
      } as ResetNewPrCount;
      const newState = pullRequestReducer(state, action);

      expect(newState.newPullRequests).toEqual(0);
    });
  });
});
