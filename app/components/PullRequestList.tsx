import React from 'react';
import { PullRequests, PullRequest } from '../reducers/types';

type Props = {
  pullRequests: PullRequests;
  fetchAll: () => void;
};

let requested = 0;

export default function Counter(props: Props) {
  const { pullRequests } = props;
  const { fetchInProgress } = pullRequests;
  const { error } = pullRequests;
  if (requested === 0) {
    requested += 1;
    props.fetchAll();
  }
  if (error !== undefined) {
    return <p>Error:{error}</p>;
  }
  if (fetchInProgress) {
    return (
      <div>
        <p>Updating</p>
      </div>
    );
  }

  const elements = pullRequests.prs.map((x: PullRequest) => {
    return (
      <a key={x.link} href={x.link}>
        {x.title}
      </a>
    );
  });
  return <div>{elements}</div>;
}
