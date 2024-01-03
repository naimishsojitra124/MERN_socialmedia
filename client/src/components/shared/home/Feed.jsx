import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { Posts } from '../../index';

const Feed = () => {
  const homePosts = useSelector((state) => state.homePosts);
  // const dispatch = useDispatch();
  return (
    <div className='Feed'>
      {homePosts.loading ? (
        <>
          Post Loading...
          <Loader size='medium' stroke='black' />
        </>
      ) : homePosts.result === 0 ? (
        <>
          <div className='feed_no-post-container'>
            <img src='/assets/icons/home-solid.svg' alt='Home Icon' />
            <div className='feed_no-post-container-text'>
              <h2>Welcome to SnapThread!</h2>
              <p>Follow some users to see their posts here.</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='feed_top'>
            <h1>Home Feed</h1>
            <img
              src='/assets/icons/refresh.svg'
              alt='Refresh Icon'
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            />
          </div>
          {homePosts.posts.map((post) => (
            <Posts key={post._id} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default Feed;
