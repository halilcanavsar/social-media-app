import React from 'react';
import Post from '../post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

function Posts({ userId }) {
  const { data, isLoading, error } = useQuery(['posts'], () =>
    makeRequest.get('/posts?userId=' + userId).then((res) => res.data)
  );

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
