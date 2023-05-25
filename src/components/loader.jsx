import React from "react";

import '../styles/loader.css';

const Loader = ({ isLoading }) => {
  return (
    <div>
      <div
        className='loader-container'
        style={{ display: isLoading ? 'block' : 'none' }}
      >
        <div className="loader">
          <div className="circle" id="circle1"></div>
          <div className="circle" id="circle2"></div>
          <div className="circle" id="circle3"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
