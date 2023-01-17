import { useContext } from 'react';
import Post from '../post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

function Posts({ userId }) {
  // const { currentUser } = useContext(AuthContext);

  // userId = userId || currentUser.id;
  const { data, isLoading, error } = useQuery(['posts'], () =>
    makeRequest.get('/posts?userId=' + userId).then((res) => {
      return res.data;
    })
  );

  console.log(userId);

  return (
    <div className="posts">
      {error
        ? 'Something went wrong!'
        : isLoading
        ? 'loading'
        : data.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
}

export default Posts;
