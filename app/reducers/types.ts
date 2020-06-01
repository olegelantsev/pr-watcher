import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';

export const RECEIVE_PULL_REQUESTS = 'RECEIVE_PULL_REQUESTS';

export const REQUEST_PULL_REQUESTS = 'REQUEST_PULL_REQUESTS';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

export const CHECK_AND_UPDATE_ACCOUNT = 'CHECK_AND_UPDATE_ACCOUNT';

export const ACCOUNT_CHECK_IN_PROGRESS = 'ACCOUNT_CHECK_IN_PROGRESS';

export const ACCOUNT_CHECK_ERROR = 'ACCOUNT_CHECK_ERROR';

export type counterStateType = {
  counter: number;
};

export enum PullRequestState {
  OPEN,
  DECLINED,
  MERGED
}

export type User = {
  name: string;
  email: string;
  displayName: string;
  id: number;
};

export type Reviewer = {
  user: User;
  lastReviewedCommit: string;
  approved: boolean;
};

export type PullRequest = {
  author: User;
  reviewers: Array<Reviewer>;
  title: string;
  description: string;
  state: PullRequestState;
  createdDate: number;
  updatedDate: number;
  link: string;
};

export type AccountSetting = {
  token: string;
  url: string;
  projectSlug: string;
  checking: boolean;
  error?: 'error' | 'success';
};

export type PullRequests = {
  prs: Array<PullRequest>;
  newPullRequests: number; // for badge
  fetchInProgress: boolean;
  error?: string;
  status: errorType;
};

export interface RequestPullRequestsAction {
  type: typeof REQUEST_PULL_REQUESTS;
}

export interface ReceivePullRequestsAction {
  type: typeof RECEIVE_PULL_REQUESTS;
  pullRequests: Array<PullRequest>;
  receivedAt: number;
  status: errorType;
  error?: string;
}

export type errorType = 'error' | 'success';

export interface UpdateAccountSetting {
  type: typeof UPDATE_ACCOUNT;
  accountSetting: AccountSetting;
  checking: boolean;
  status?: errorType;
  error?: string;
}

export interface AccountCheckProgress {
  type: typeof ACCOUNT_CHECK_IN_PROGRESS;
}

export interface AccountCheckError {
  type: typeof ACCOUNT_CHECK_ERROR;
  status: errorType;
  error: string;
}

export interface CheckAndUpdateAccountSetting {
  type: typeof CHECK_AND_UPDATE_ACCOUNT;
  accountSetting: AccountSetting;
}

export type PullRequestActions =
  | RequestPullRequestsAction
  | ReceivePullRequestsAction
  | UpdateAccountSetting;

export type GetState = () => ApplicationState;

export type Dispatch = ReduxDispatch<Action<string>>;

// The top-level state object
export interface ApplicationState {
  counter: number;
  pullRequests: PullRequests;
  accountSetting?: AccountSetting;
}

export type Store = ReduxStore<ApplicationState, Action<string>>;
