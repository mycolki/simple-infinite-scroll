/* eslint-disable @typescript-eslint/naming-convention */
import { Link } from 'react-router-dom';
import { Issue } from '../../../types';

type Props = {
  issue: Issue;
};

function IssueItem({ issue }: Props) {
  const { number, title, creator, created_at, comments } = issue;
  return (
    <div>
      <Link to={`/detail/${number}`}>
        <div>#{number}</div>
      </Link>
      <div>제목: {title}</div>
      <div>작성자: {creator}</div>
      <div>작성일: {created_at}</div>
      <div>코멘트수: {comments}</div>
    </div>
  );
}

export default IssueItem;
