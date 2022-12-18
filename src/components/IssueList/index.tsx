import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useIntersect from '../../hooks/useIntersect';

import { Issue } from '../../types';
import IssueItem from './IssueItem';

const token = process.env.REACT_APP_API_TOKEN;

function IssueList() {
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const PER_SIZE = 20;

      const response = await fetch(
        `https://api.github.com/repos/angular/angular-cli/issues?sort=comments$&per_page=${PER_SIZE}&page=${page}`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setIssueData(prevData => [...prevData, ...data]);
      setIsFetching(false);
    };

    setIsFetching(true);
    fetchData();
  }, [page]);

  const fetchNextData = useCallback(() => {
    if (!isFetching) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isFetching]);

  const ref = useIntersect(fetchNextData, { rootMargin: '0px 0px 400px 0px' });

  return (
    <StyledList>
      {issueData.map(issue => (
        <IssueItem key={issue.id} issue={issue} />
      ))}

      <Ref ref={ref} />
    </StyledList>
  );
}

export default IssueList;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Ref = styled.div`
  height: 2rem;
`;
