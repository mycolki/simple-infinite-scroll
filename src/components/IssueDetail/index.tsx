import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Issue } from '../../types';

const token = process.env.REACT_APP_API_TOKEN;

function IssueDetail() {
  const [detail, setDetail] = useState<Issue | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.github.com/repos/angular/angular-cli/issues/${id}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setDetail(data);
    };

    fetchData();
  }, [id]);

  return (
    <Main>
      {detail && (
        <>
          <div>#{detail.number}</div>
          <div>제목: {detail.title}</div>
          <div>작성자: {detail.creator}</div>
          <div>작성일: {detail.created_at}</div>
          <div>
            <img src={detail.avatar_url} alt="creator" />
          </div>
          <div>{detail.body}</div>
        </>
      )}
    </Main>
  );
}

export default IssueDetail;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
