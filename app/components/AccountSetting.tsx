import React from 'react';
import { PullRequests } from '../reducers/types';

type Props = {
  pullRequests: PullRequests;
  fetchAll: () => void;
};

export default function AccountSetting(props: Props) {
  return <h2>Account setting page</h2>;
}
