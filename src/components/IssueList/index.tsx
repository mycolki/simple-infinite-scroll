import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useObserve from '../../hooks/useObserve';

import { Issue } from '../../types';
import IssueItem from './IssueItem';

const token = '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';

function IssueList() {
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.github.com/repos/angular/angular-cli/issues?sort=comments$&per_page=${size}&page=${page}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setIssueData(data);
    };

    fetchData();
  }, [page, size]);

  const fetchNextData = () => {
    setPage(prevPage => prevPage + 1);
  };

  const bottomRef = useObserve(() => {
    console.log('닿았다.');
    // fetchNextData();
  });

  return (
    <StyledList>
      {issueData.map(issue => (
        <IssueItem key={issue.id} issue={issue} />
      ))}
      <div ref={bottomRef} />
    </StyledList>
  );
}

export default IssueList;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
