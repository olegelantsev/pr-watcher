import React from 'react';
import { PullRequests } from '../reducers/types';

type Props = {
  pullRequests: PullRequests;
  fetchAll: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AccountSetting(_props: Props) {
  return <h2>Account setting page</h2>;
}
