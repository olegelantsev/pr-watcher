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
  ReceivePullRequestsAction,
  UPDATE_ACCOUNT,
  UpdateAccountSetting
} from '../reducers/types';

// https://docs.atlassian.com/bitbucket-server/rest/7.2.3/bitbucket-rest.html#idp281

export function updateAccount(
  accountSetting: AccountSetting
): UpdateAccountSetting {
  return {
    type: UPDATE_ACCOUNT,
    accountSetting
  };
}

export function requestPullRequests() {
  return {
    type: REQUEST_PULL_REQUESTS
  };
}

export async function fetchRepoSlags(baseUrl: string, projectKey: string) {
  const response = await fetch(
    `${baseUrl}/rest/api/1.0/projects/${projectKey}/repos`
  );
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

function receivePosts(
  pullRequests: Array<PullRequest>
): ReceivePullRequestsAction {
  return {
    type: RECEIVE_PULL_REQUESTS,
    pullRequests,
    receivedAt: Date.now()
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
      reviewers: parseReviewers(x.reviewers)
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

    return fetchRepoSlags(accountSetting.url, accountSetting.projectSlug)
      .then(repoSlugs => {
        return fetchPullRequestsAndMerge(repoSlugs, accountSetting);
      })
      .then((pullRequests: Array<PullRequest>) => {
        return dispatch(receivePosts(pullRequests));
      })
      .catch(err => {
        throw err;
      });
  };
}
