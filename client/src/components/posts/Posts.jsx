import React from 'react';
import Post from '../post/Post';

function Posts() {
  const posts = [
    {
      id: 1,
      name: 'John Doe',
      userId: 1,
      profilePic:
        'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
      img: 'https://images.pexels.com/photos/3658809/pexels-photo-3658809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: 2,
      name: 'John Doe',
      userId: 2,
      profilePic:
        'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.',
    },
  ];

  return (
    <div className="posts">
      {posts.map((post) => (
        // <div className="post" key={post.id}>
        //   <img className="postProfileImg" src={post.img} alt="" />
        //   <span className="postUsername">{post.name}</span>
        // </div>
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
