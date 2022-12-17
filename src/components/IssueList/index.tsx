import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Issue } from '../../types';
import IssueItem from './IssueItem';

const token = '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';

function IssueList() {
  const [issueData, setIssueData] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.github.com/repos/angular/angular-cli/issues?sort=comments:', {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setIssueData(data);
    };

    fetchData();
  }, []);

  return (
    <StyledList>
      {issueData.map(issue => (
        <IssueItem key={issue.id} issue={issue} />
      ))}
    </StyledList>
  );
}

export default IssueList;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
