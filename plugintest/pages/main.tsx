console.log('I RUNS');

import { useEffect } from 'react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

// //Database models

import Scenes from './scenes';
import LibraryPage from './library';
import log from 'electron-log';
import { ipcRenderer } from 'electron';

export const ScenesIcon = require('../assets/icons/iconmonstr-computer-2.svg');
export const LibraryIcon = require('../assets/icons/iconmonstr-layer-22.svg');

interface MainProps {
  setRoute: Function;
  setRoutePage: Function;
  setPage: Function;
  addPluginMenu: Function;
}

let firstRun = 0;

const Main: FC<MainProps> = ({
  setRoute,
  setRoutePage,
  setPage,
  addPluginMenu,
}) => {
  const menu = [
    {
      name: 'plugins_ARPaper_scenes',
      pluginName: 'ARPaper',
      el: (
        <NavLink
          onClick={() => setPage(`plugins_ARPaper_scenes`)}
          className='navButton'
          to='plugins_ARPaper_scenes'
          id='plugins_ARPaper_scenes'
        >
          <div
            data-tip={'ARPaper Scenes'}
            className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
            style={{ width: 46, height: 34 }}
          >
            <ReactTooltip />
            <img
              className='ml-3 my-2 relative'
              style={{
                width: 24,
                height: 24,
                top: 5,
                filter:
                  'invert(48%) sepia(29%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%) drop-shadow(-0.5px -0.5px 0 black) drop-shadow(0.5px 0.5px 0 black)',
              }}
              src={ScenesIcon.default}
              alt='S'
            />
          </div>
        </NavLink>
      ),
    },
    {
      name: 'plugins_ARPaper_library',
      pluginName: 'ARPaper',
      el: (
        <NavLink
          onClick={() => setPage(`plugins_ARPaper_library`)}
          className='navButton'
          to='plugins_ARPaper_library'
          id='plugins_ARPaper_library'
        >
          <div
            data-tip={'ARPaper Library'}
            className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
            style={{ width: 46, height: 34 }}
          >
            <ReactTooltip />
            <img
              className='ml-3 my-2 relative'
              style={{
                width: 24,
                height: 24,
                top: 5,
                filter:
                  'invert(48%) sepia(29%) saturate(2476%) hue-rotate(190deg) brightness(118%) contrast(119%) drop-shadow(-0.5px -0.5px 0 black) drop-shadow(0.5px 0.5px 0 black)',
              }}
              src={LibraryIcon.default}
              alt='S'
            />
          </div>
        </NavLink>
      ),
    },
  ];

  useEffect(() => {
    addPluginMenu(menu[1], 'plugins_ARPaper_library', {
      route: {
        name: 'library',
        path: '/plugins_ARPaper_library',
        component: 'Library',
      },
      component: Scenes,
    });
    addPluginMenu(menu[0], 'plugins_ARPaper_scenes', {
      route: {
        name: 'scenes',
        path: '/plugins_ARPaper_scenes',
        component: 'Scenes',
      },
      component: LibraryPage,
    });
    setRoutePage(
      {
        name: 'library',
        path: '/plugins_ARPaper_library',
        component: 'Library',
      },
      Scenes
    );
    setRoutePage(
      {
        name: 'scenes',
        path: '/plugins_ARPaper_scenes',
        component: 'Scenes',
      },
      LibraryPage
    );
  }, []);

  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      I PLUGIN MAIN WALLPAPERS = ❤
      <img src={ScenesIcon.default} className='w-10 h-10' alt='' />
    </div>
  );
};

export default Main;
