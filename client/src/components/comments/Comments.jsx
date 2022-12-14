import React, { useContext } from 'react';
import './comments.scss';

import { AuthContext } from '../../context/authContext';

function Comments() {
  const { currentUser } = useContext(AuthContext);

  const comments = [
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
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input type="text" placeholder="Write a comment..." />
        <button>Send</button>
      </div>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">1 hour ago</span>
        </div>
      ))}
    </div>
  );
}

export default Comments;
