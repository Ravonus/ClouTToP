import React, { FC, DetailedHTMLProps } from 'react';

import { NavLink } from 'react-router-dom';

import SettingsIcon from '../assets/icons/iconmonstr-gear-11.svg';

import ReactTooltip from 'react-tooltip';

interface MenuProps {
  buttons: DetailedHTMLProps<any, any> | DetailedHTMLProps<any, any>[];
}

const Menu: FC<MenuProps> = ({ buttons }) => {
  if (!Array.isArray(buttons)) buttons = [buttons];
  return (
    <div className='fixed border-t-2 border-b-2 border-transparent group-hover:border-primary border-l-2 w-12 h-screen bg-gray-300 dark:bg-gray-500 flex justify-center'>
      <div className='grid-flow-col grid-cols-1 grid-rows-1 gap-1'>
        <div className='h-10'></div>

        {buttons.map((button: any, i: number) => {
          return <div key={`nav-${i}`}>{eval(button)}</div>;
        })}

        {/* <div
          data-tip='Plugins'
          className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
          style={{ width: 46, height: 34 }}
        >
          <ReactTooltip />
          <img
            className='filter-green ml-3 mt-3 relative'
            style={{ width: 24, height: 24, top: 5 }}
            src={Plugins}
            alt='X'
          />
        </div> */}
      </div>

      <div className='grid grid-flow-col grid-cols-1 grid-rows-1 gap-4 absolute bottom-0 left-0'>
        <NavLink to='/settings'>
          <div
            data-tip='Settings'
            className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
            style={{ width: 46, height: 34 }}
          >
            <ReactTooltip />
            <img
              className='filter-green ml-3 my-2 relative'
              style={{ width: 24, height: 24, top: 5 }}
              src={SettingsIcon}
              alt='H'
            />
          </div>{' '}
        </NavLink>
        ,
      </div>
    </div>
  );
};

export default Menu;
