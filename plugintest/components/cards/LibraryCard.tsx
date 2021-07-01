import React, { DetailedHTMLProps, FC, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface CardProps {
  opt: any;
  sidebarCheck: Function;
}

export const LibraryCard: FC<CardProps> = ({ opt, sidebarCheck }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        history.push(`/plugins_${opt.name}`);
        sidebarCheck();
      }}
      className='flex flex-col h-full max-w-lg mx-auto bg-gray-800 rounded-lg cursor-pointer'
    >
      <img
        className='rounded-lg rounded-b-none'
        src='http://www.3forty.media/ruki/wp-content/uploads/2020/06/meditation-yoga-1024x682.jpg'
        alt='thumbnail'
        loading='lazy'
      />
      <div className='flex justify-between -mt-4 px-4'>
        <span className='inline-block ring-4 bg-primary ring-gray-800 rounded-full text-sm font-medium tracking-wide text-gray-100 px-3 pt-0.5'>
          {opt.name}
        </span>
        <span className='flex h-min space-x-1 items-center rounded-full text-gray-400 bg-gray-800 py-1 px-2 text-xs font-medium'>
          <p className='text-blue-500 font-semibold text-xs'>{opt.version}</p>
        </span>
      </div>
      <div className='py-2 px-4'>
        <h1 className='text-xl font-medium leading-6 tracking-wide text-gray-300 hover:text-blue-500 cursor-pointer'>
          <a href='blog/detail'></a>
        </h1>
      </div>
      <div className='px-4 space-y-2'>
        <p className='text-gray-400 font-normal leading-5 tracking-wide'>
          {opt.description}
        </p>
        {/* <router-link
          to='blog/detail'
          className='font-bold hover:text-blue-400 text-gray-100'
        >
          read more...
        </router-link> */}
      </div>
      <div className='flex flex-row items-end h-full w-full px-4 mt-4'>
        <div className='flex border-t border-gray-700 w-full py-4'>
          <div className='flex items-center space-x-3 border-r border-gray-700 w-full'>
            <img
              src={`https://robohash.org/${opt.author}?set=set4&size=35x35`}
            ></img>
            <div>
              <p className='text-sm font-semibold tracking-wide text-gray-200'>
                {opt.author}
              </p>
            </div>
          </div>
          <div className='flex items-center flex-shrink-0 px-2'>
            <div className='flex items-center space-x-1 text-gray-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                />
              </svg>
              <p className='font-medium'>10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryCard;
