import { spy } from 'sinon';
import nock from 'nock';
import * as actions from '../../app/actions/pullRequest';
import * as repoResponse from './stubs/repos.json';
import * as pullRequestsResponse from './stubs/pullRequests.json';
import * as twoReposResponse from './stubs/repos2.json';
import * as repo2PullRequestResponse from './stubs/repo2_pullRequests.json';
import {
  REQUEST_PULL_REQUESTS,
  ApplicationState,
  AccountSetting
} from '../../app/reducers/types';

describe('actions', () => {
  it('should fetch list of repo slugs', async () => {
    nock('http://bitbucket.com')
      .get('/rest/api/1.0/projects/123/repos')
      .reply(200, repoResponse, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      });
    const repoSlugs = await actions.fetchRepoSlags({
      url: 'http://bitbucket.com',
      token: 'some-token',
      projectSlug: '123'
    } as AccountSetting);
    expect(repoSlugs.sort()).toEqual(['repo1']);
  });

  it('should fetch list of PRs in repo', async () => {
    nock('http://bitbucket.com')
      .get('/rest/api/1.0/projects/projectname/repos/reponame/pull-requests')
      .reply(200, pullRequestsResponse, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      });
    const pullRequests = await actions.fetchPullsRequests(
      'http://bitbucket.com',
      'projectname',
      'reponame'
    );
    expect(pullRequests).toMatchSnapshot();
  });

  it('should fetch repos and pull requests', () => {
    nock('http://bitbucket.com')
      .get('/rest/api/1.0/projects/projectname/repos')
      .reply(200, twoReposResponse, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      })
      .get('/rest/api/1.0/projects/projectname/repos/repo1/pull-requests')
      .reply(200, pullRequestsResponse, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      })
      .get('/rest/api/1.0/projects/projectname/repos/repo2/pull-requests')
      .reply(200, repo2PullRequestResponse, {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json'
      });
    return new Promise(resolve => {
      Date.now = jest.fn(() => 1359075920);
      const fn = actions.fetchAll();
      const dispatch = spy();
      const getState = () =>
        ({
          accountSetting: {
            projectSlug: 'projectname',
            token: 'mytoken',
            url: 'http://bitbucket.com'
          }
        } as ApplicationState);
      fn(dispatch, getState);
      setTimeout(() => {
        const calls = dispatch.getCalls();
        expect(calls.length).toBe(2);

        expect(dispatch.getCall(0).args[0]).toEqual({
          type: REQUEST_PULL_REQUESTS
        });

        expect(dispatch.getCall(1).args[0]).toMatchSnapshot();
        resolve();
      }, 40);
    });
  });

  it('should dispatch error if fetch fails', () => {
    return new Promise(resolve => {
      Date.now = jest.fn(() => 1359075920);
      const fn = actions.fetchAll();
      const dispatch = spy();
      const getState = () =>
        ({
          accountSetting: {
            projectSlug: 'projectname',
            token: 'mytoken',
            url: 'http://example.com'
          }
        } as ApplicationState);
      fn(dispatch, getState);
      setTimeout(() => {
        const calls = dispatch.getCalls();
        expect(calls.length).toBe(2);

        expect(dispatch.getCall(1).args[0]).toMatchSnapshot();
        resolve();
      }, 1500);
    });
  });
});
