import fetch from 'cross-fetch';
import {
  GetState,
  Dispatch,
  PullRequest,
  User,
  Reviewer,
  AccountSetting,
  REQUEST_PULL_REQUESTS,
  RECEIVE_PULL_REQUESTS,
  ReceivePullRequestsAction
} from '../reducers/types';

// https://docs.atlassian.com/bitbucket-server/rest/7.2.3/bitbucket-rest.html#idp281

export function requestPullRequests() {
  return {
    type: REQUEST_PULL_REQUESTS
  };
}

export async function fetchRepoSlags(accountSetting: AccountSetting) {
  const response = await fetch(
    `${accountSetting.url}/rest/api/1.0/projects/${accountSetting.projectSlug}/repos`,
    {
      method: 'get',
      headers: new Headers({
        Authorization: `Bearer ${accountSetting.token}`
      })
    }
  );
  if (response.status >= 400) {
    throw new Error(`Server responded with ${response.status}`);
  }
  const data = await response.json();
  return data.values.map((x: any) => x.slug);
}

function convertUser(x: any) {
  return {
    displayName: x.displayName,
    email: x.emailAddress,
    id: x.id,
    name: x.name
  } as User;
}

function parseReviewers(reviewers: [any]) {
  return reviewers.map((reviewer: any) => {
    return {
      approved: reviewer.approved,
      lastReviewedCommit: reviewer.lastReviewedCommit,
      user: convertUser(reviewer.user)
    } as Reviewer;
  });
}

// function resetNewPrCount() {
//   return {
//     type: RESET_NEW_PR_COUNT
//   };
// }

function receivePullRequests(
  pullRequests: Array<PullRequest>,
  error?: string
): ReceivePullRequestsAction {
  return {
    type: RECEIVE_PULL_REQUESTS,
    pullRequests,
    receivedAt: Date.now(),
    error,
    status: error != null ? 'error' : 'success'
  };
}

export async function fetchPullsRequests(
  baseUrl: string,
  projectKey: string,
  repositorySlug: string
) {
  const response = await fetch(
    `${baseUrl}/rest/api/1.0/projects/${projectKey}/repos/${repositorySlug}/pull-requests`
  );
  const data = await response.json();
  return data.values.map((x: any) => {
    return {
      title: x.title,
      description: x.description,
      createdDate: x.createdDate,
      updatedDate: x.updatedDate,
      author: convertUser(x.author.user),
      reviewers: parseReviewers(x.reviewers),
      link: x.links.self[0].href,
      state: x.state
    } as PullRequest;
  });
}

async function fetchPullRequestsAndMerge(
  repoSlugs: Array<string>,
  accountSetting: AccountSetting
): Promise<Array<PullRequest>> {
  const listOfPullRequests = await Promise.all(
    repoSlugs.map((repoSlug: string) =>
      fetchPullsRequests(
        accountSetting.url,
        accountSetting.projectSlug,
        repoSlug
      )
    )
  );
  const merged = [].concat(...listOfPullRequests);

  return merged;
}

export function fetchAll() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { accountSetting } = getState();

    if (accountSetting == null) {
      throw Error("Can't fetch if account isn't added.");
    }

    dispatch(requestPullRequests());

    return fetchRepoSlags(accountSetting)
      .then(repoSlugs => {
        return fetchPullRequestsAndMerge(repoSlugs, accountSetting);
      })
      .then((pullRequests: Array<PullRequest>) => {
        return dispatch(receivePullRequests(pullRequests));
      })
      .catch(err => {
        dispatch(receivePullRequests([], String(err)));
      });
  };
}
