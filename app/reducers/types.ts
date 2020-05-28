import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { type } from 'os';

export const RECEIVE_PULL_REQUESTS = 'RECEIVE_PULL_REQUESTS';

export const REQUEST_PULL_REQUESTS = 'REQUEST_PULL_REQUESTS';

export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';

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
};

export type PullRequests = {
  prs: Array<PullRequest>;
  newPullRequests: number; // for badge
  fetchInProgress: boolean;
  error?: string;
  status: 'error' | 'success';
};

export interface RequestPullRequestsAction {
  type: typeof REQUEST_PULL_REQUESTS;
}

export interface ReceivePullRequestsAction {
  type: typeof RECEIVE_PULL_REQUESTS;
  pullRequests: Array<PullRequest>;
  receivedAt: number;
  status: 'error' | 'success';
  error?: string;
}

export interface UpdateAccountSetting {
  type: typeof UPDATE_ACCOUNT;
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
