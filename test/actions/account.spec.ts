import { spy } from 'sinon';
import nock from 'nock';
import * as actions from '../../app/actions/account';
import * as repoResponse from './stubs/repos.json';
import * as pullRequestsResponse from './stubs/pullRequests.json';
import * as twoReposResponse from './stubs/repos2.json';
import * as repo2PullRequestResponse from './stubs/repo2_pullRequests.json';
import {
  REQUEST_PULL_REQUESTS,
  ApplicationState,
  AccountSetting,
  ACCOUNT_CHECK_IN_PROGRESS
} from '../../app/reducers/types';

describe('account actions', () => {
  it('checks account successfully', async () => {
    nock('http://bitbucket.com')
      .get('/rest/api/1.0/projects/123/repos')
      .reply(200, repoResponse, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      });
    return new Promise(resolve => {
      Date.now = jest.fn(() => 1359075920);
      const fn = actions.checkAndUpdateAccount({
        url: 'http://bitbucket.com',
        projectSlug: '123',
        token: 'some-token'
      } as AccountSetting);
      const dispatch = spy();
      const getState = () =>
        ({
          accountSetting: {
            checking: false,
            error: undefined
          }
        } as ApplicationState);
      fn(dispatch, getState);
      setTimeout(() => {
        const calls = dispatch.getCalls();
        expect(calls.length).toBe(2);

        expect(dispatch.getCall(0).args[0]).toEqual({
          type: ACCOUNT_CHECK_IN_PROGRESS
        });

        expect(dispatch.getCall(1).args[0]).toMatchSnapshot();
        resolve();
      }, 50);
    });
  });

  it('checks account with error', async () => {
    nock('http://bitbucket.com')
      .get('/rest/api/1.0/projects/123/repos')
      .reply(404, repoResponse, {
        'Access-Control-Allow-Origin': '*'
      });
    return new Promise(resolve => {
      Date.now = jest.fn(() => 1359075920);
      const fn = actions.checkAndUpdateAccount({
        url: 'http://bitbucket.com',
        projectSlug: '123',
        token: 'some-token'
      } as AccountSetting);
      const dispatch = spy();
      const getState = () =>
        ({
          accountSetting: {
            checking: false,
            error: undefined
          }
        } as ApplicationState);
      fn(dispatch, getState);
      setTimeout(() => {
        const calls = dispatch.getCalls();
        expect(calls.length).toBe(2);

        expect(dispatch.getCall(0).args[0]).toEqual({
          type: ACCOUNT_CHECK_IN_PROGRESS
        });

        expect(dispatch.getCall(1).args[0]).toMatchSnapshot();
        resolve();
      }, 150);
    });
  });
});
