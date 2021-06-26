import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface TopProps {}

const TopBar: FC<TopProps> = () => {
  return (
    <>
      <div className='fixed w-screen h-10 bg-gray-200'></div>
      <div
        className='draggable fixed w-screen h-10 bg-gray-200'
        style={{ width: '90%' }}
      ></div>
      <div className='hover:bg-red-500 absolute top-1 right-1 w-8 text-center'>
        <span className='cursor-pointer font-extralight text-lg text-center'>
          X
        </span>
      </div>
      <div className='hover:bg-gray-300 absolute top-1 right-7 w-8 text-center'>
        <span className='cursor-pointer font-extralight text-lg text-center'>
          []
        </span>
      </div>
      <div className='hover:bg-gray-300 absolute top-1 right-14 w-8 text-center'>
        <span className='cursor-pointer font-extralight text-lg text-center'>
          _
        </span>
      </div>
    </>
  );
};

export default TopBar;
