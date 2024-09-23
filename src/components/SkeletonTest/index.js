import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonTest = () => {
  return (
    <div>
      <h2>User Profile</h2>
      <div className="user-details">
        <div className="user-info">
          <Skeleton enableAnimation/>
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  );
}

export default SkeletonTest;