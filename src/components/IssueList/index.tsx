import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Issue } from '../../types';
import IssueItem from './IssueItem';

const token = process.env.REACT_APP_API_TOKEN;

function IssueList() {
  const [issueData, setIssueData] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);

  const ref = useRef<HTMLDivElement | null>(null);

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

    fetchData();
  }, [page]);

  useEffect(() => {
    if (!ref.current) return;

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isFetching) {
            observer.unobserve(entry.target);
            setPage(prevPage => prevPage + 1);
          }
        });
      },
      { rootMargin: '0px 0px 400px 0px' }
    );

    intersectionObserver.observe(ref.current);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [isFetching]);

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
