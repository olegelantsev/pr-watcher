import React from 'react';
import Hoc from './hoc';
import PullRequestsPage from './PullRequestsPage';

const Wrapped = Hoc(PullRequestsPage);

export default function HomePage() {
  return <Wrapped />;
}
