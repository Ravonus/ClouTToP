import { FC, useState } from 'react';
import { ipcRenderer } from 'electron';
import Store from 'electron-store';

import Close from '../assets/icons/iconmonstr-x-mark-8.svg';
import CloseThin from '../assets/icons/iconmonstr-x-mark-thin.svg';
import Expand from '../assets/icons/iconmonstr-external-link-thin.svg';
import Minimize from '../assets/icons/iconmonstr-minus-thin.svg';
import LightOff from '../assets/icons/iconmonstr-light-bulb-17.svg';
import LightOn from '../assets/icons/iconmonstr-light-bulb-18.svg';

interface TopProps {
  darkmodeCheck: Function;
}

const store = new Store();

const TopBar: FC<TopProps> = ({ darkmodeCheck }) => {
  const [darkmode, setDarkmode] = useState(store.get('darkmode') || false);
  return (
    <div className='flex flex-wrap content-end'>
      <div className='fixed border-t border-r border-transparent group-hover:border-primary group-focus:border-red-primary w-screen h-9 bg-gray-200 dark:bg-gray-700'></div>

      <div
        className='draggable fixed w-screen h-10 bg-transparent'
        style={{ width: '85%' }}
      ></div>
      <span className='fixed left-8 text-gray-900 dark:text-gray-200'>
        ARScreenz
      </span>
      <div className='cursor-pointer hover:bg-red-500 dark:hover:bg-red-700 fixed top-0 right-0 text-center p-2 px-3'>
        <span className='color-gray-900 dark:color-gray-200 cursor-pointer text-center'>
          <img
            className='filter-green'
            style={{ width: 18, height: 18 }}
            src={Close}
            alt='X'
          />
        </span>
      </div>
      <div className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 right-10 text-center p-2 px-3'>
        <span className='cursor-pointer text-center'>
          <img
            className='filter-green'
            style={{ width: 18, height: 18 }}
            src={Expand}
            alt='[]'
          />
        </span>
      </div>
      <div className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 right-20 text-center p-2 px-3'>
        <span className='cursor-pointer text-center'>
          <img
            className='filter-green'
            style={{ width: 18, height: 18 }}
            src={Minimize}
            alt='--'
          />
        </span>
      </div>
      <div
        onClick={() => {
          const dm = darkmode ? false : true;
          setDarkmode(dm);
          store.set('darkmode', dm);
          darkmodeCheck(dm);
        }}
      >
        {darkmode ? (
          <div
            style={{ right: 115 }}
            className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 text-center p-2 px-3'
          >
            <span className='cursor-pointer text-center'>
              <img
                className='filter-green'
                style={{ width: 18, height: 18 }}
                src={LightOff}
                alt='--'
              />
            </span>
          </div>
        ) : (
          <div
            style={{ right: 115 }}
            className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 text-center p-2 px-3'
          >
            <span className='cursor-pointer text-center'>
              <img
                className='filter-green'
                style={{ width: 18, height: 18 }}
                src={LightOn}
                alt='--'
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
