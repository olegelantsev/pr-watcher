import React from 'react';
import { PullRequests, PullRequest } from '../reducers/types';

const { shell } = require('electron');

type Props = {
  pullRequests: PullRequests;
  fetchAll: () => void;
};

export default function AccountSetting(props: Props) {
  console.log('Account setting page');
  return <h2>Account setting page</h2>;
}
