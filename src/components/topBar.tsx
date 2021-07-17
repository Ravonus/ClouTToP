//TODO: Add Settings to active side nav check.

import { FC, useState } from 'react';
import { ipcRenderer, remote } from 'electron';
import path from 'path';

import Close from '../assets/icons/iconmonstr-x-mark-8.svg';
import CloseThin from '../assets/icons/iconmonstr-x-mark-thin.svg';
import Expand from '../assets/icons/iconmonstr-external-link-thin.svg';
import Minimize from '../assets/icons/iconmonstr-minus-thin.svg';
import LightOff from '../assets/icons/iconmonstr-light-bulb-12.svg';
import LightOn from '../assets/icons/iconmonstr-light-bulb-17.svg';

import { useHistory } from 'react-router-dom';
import { updateConfig } from '../libs/configurator';

const { BrowserWindow } = remote;

interface TopProps {
  darkmodeCheck: Function;
  darkmode: boolean;
  setDarkmode: Function;
}

let firstRun = true;

const TopBar: FC<TopProps> = ({ darkmodeCheck, darkmode, setDarkmode }) => {
  const [width, setWidth] = useState(window.innerWidth);

  if (firstRun) {
    useHistory().push('/dashboard');
    setTimeout(() => {
      let element = document.querySelector('#darkmode > div');

      var rect = element?.getBoundingClientRect();

      if (rect) setWidth(rect.right - 43);
    }, 2000);

    firstRun = false;
  }

  const navButtons = document.querySelectorAll('.navButton');

  navButtons.forEach((button) => {
    const active = button.classList[1];
    if (active)
      button
        .querySelector('div')
        ?.classList.add(
          'dark:bg-gray-700',
          'bg-gray-200',
          'border-l-200',
          'dark:border-white',
          'border-black'
        );
    else
      button
        .querySelector('div')
        ?.classList.remove(
          'dark:bg-gray-700',
          'bg-gray-200',
          'border-l-2',
          'dark:border-white',
          'border-black'
        );
  });

  window.addEventListener('resize', function (event) {
    let element = document.querySelector('#darkmode > div');

    var rect = element?.getBoundingClientRect();

    if (rect) setWidth(rect.right - 43);
  });
  return (
    <div className='flex flex-wrap content-end'>
      <div className='fixed border-t-2 border-r-2 border-transparent group-hover:border-primary group-focus:border-red-primary w-screen h-9 bg-gray-200 dark:bg-gray-700'></div>

      <div
        className='draggable fixed w-screen h-10 bg-transparent'
        style={{
          width,
        }}
      ></div>
      <span className='fixed left-14 text-gray-900 dark:text-gray-200'>
        ClouTTop
      </span>
      <div
        onClick={() => BrowserWindow.getFocusedWindow()?.close()}
        className='cursor-pointer hover:bg-red-500 dark:hover:bg-red-700 fixed top-0 right-0 text-center p-2 px-3'
      >
        <span className='color-gray-900 dark:color-gray-200 cursor-pointer text-center'>
          <img
            className={`filter-${darkmode ? 'green' : 'blue'}`}
            style={{ width: 18, height: 18 }}
            src={Close}
            alt='X'
          />
        </span>
      </div>
      <div
        onClick={() => {
          const isFullScreen = BrowserWindow.getFocusedWindow()?.isFullScreen();
          BrowserWindow.getFocusedWindow()?.setFullScreen(
            isFullScreen ? false : true
          );
        }}
        className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 right-10 text-center p-2 px-3'
      >
        <span className='cursor-pointer text-center'>
          <img
            className={`filter-${darkmode ? 'green' : 'blue'}`}
            style={{ width: 18, height: 18 }}
            src={Expand}
            alt='[]'
          />
        </span>
      </div>
      <div
        onClick={() => BrowserWindow.getFocusedWindow()?.minimize()}
        className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 right-20 text-center p-2 px-3'
      >
        <span className='cursor-pointer text-center'>
          <img
            className={`filter-${darkmode ? 'green' : 'blue'}`}
            style={{ width: 18, height: 18 }}
            src={Minimize}
            alt='--'
          />
        </span>
      </div>
      <div
        id='darkmode'
        onClick={() => {
          const dm = darkmode ? false : true;
          setDarkmode(dm);
          updateConfig('main', { darkmode: dm });
          darkmodeCheck(dm);

          ipcRenderer.invoke('pluginAccept', dm);
        }}
      >
        {darkmode ? (
          <div
            style={{ right: 115 }}
            className='cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 fixed top-0 text-center p-2 px-3'
          >
            <span className='cursor-pointer text-center'>
              <img
                className={`filter-${darkmode ? 'green' : 'blue'}`}
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
                className={`filter-${darkmode ? 'green' : 'blue'}`}
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
