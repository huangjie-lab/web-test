import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import './index.scss'
const SkeletonTest = () => {
  return (
    <div>
      {/* <h2 className='animate__animated animate__rotateIn'>User Profile</h2>
      <div className="user-details">
        <div className="user-info">
          <Skeleton enableAnimation/>
          <Skeleton />
          <Skeleton />
        </div>
      </div> */}
      {/* <div class="container">
          <div class="left">left</div>
          <div class="main">main</div>
          <div class="right">right</div>
      </div> */}
      <div className="color-transition"></div>
      <div className="size-transition"></div>
      <div className="multi-transition"></div>
    </div>
  );
}

export default SkeletonTest;