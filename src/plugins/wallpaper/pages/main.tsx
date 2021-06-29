import { useEffect } from 'react';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import Scenes from './scenes';

export const Icon = require('../assets/icons/iconmonstr-computer-2.svg');

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
  const menu = {
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
            src={Icon.default}
            alt='S'
          />
        </div>
      </NavLink>
    ),
  };

  addPluginMenu(menu, 'plugins_ARPaper_scenes');
  setRoutePage('Scenes', Scenes);
  setRoute({
    name: 'scenes',
    path: '/plugins_ARPaper_scenes',
    component: 'Scenes',
  });

  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      I PLUGIN MAIN WALLPAPERS = ❤
      <img src={Icon.default} className='w-10 h-10' alt='' />
    </div>
  );
};

export default Main;
