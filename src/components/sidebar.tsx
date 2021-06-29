import React, { FC, DetailedHTMLProps } from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import SettingsIcon from '../assets/icons/iconmonstr-gear-11.svg';

import ReactTooltip from 'react-tooltip';
import { useState } from 'react';
import { loadStore } from '../libs/store';

interface MenuProps {
  navInfo: DetailedHTMLProps<any, any> | DetailedHTMLProps<any, any>[];
  setPage: Function;
  darkmode: boolean;
}

const Menu: FC<MenuProps> = ({ navInfo, setPage, darkmode }) => {
  if (!Array.isArray(navInfo.mainMenu)) navInfo.mainMenu = [navInfo.mainMenu];

  const history = useHistory();

  return (
    <div
      // onMouseEnter={(event: any) => {
      //   event.target.style.borderColor = darkmode ? 'green' : 'blue';
      // }}
      // onMouseLeave={(event: any) => {
      //   event.target.style.borderColor = darkmode ? 'white' : 'black';
      // }}
      className='fixed border-t-2 border-b-2 border-transparent group-hover:border-primary border-l-2 w-12 h-screen bg-gray-300 dark:bg-gray-500 flex justify-center'
    >
      <div className='grid-flow-col grid-cols-1 grid-rows-1 gap-1'>
        <div className='h-10'></div>

        {navInfo.mainMenu.map((nav: any, i: number) => {
          if (
            nav.routes &&
            !nav.routes.includes(history.location.pathname.substring(1))
          ) {
            return null;
          }

          return <div key={`nav-${i}`}>{eval(nav.el)}</div>;
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
        <div className='grid-flow-col grid-cols-1 grid-rows-1 gap-1'>
          {navInfo.pluginMenu.map((nav: any, i: number) => {
            if (
              nav.routes &&
              !nav.routes.includes(history.location.pathname.substring(1))
            ) {
              return null;
            }

            return (
              <div className='' key={`nav-${i}`}>
                {nav.parent ? (
                  <>
                    {' '}
                    <div className='h-4' />
                    <div className='h-1 border-t border-black dark:border-gray-300'></div>
                  </>
                ) : (
                  ''
                )}
                {eval(nav.el)}
              </div>
            );
          })}
        </div>
      </div>

      <div className='grid grid-flow-col grid-cols-1 grid-rows-1 gap-4 absolute bottom-0 left-0'>
        <NavLink
          className='navButton'
          to='/settings'
          onClick={() => {
            console.log('terd');
            setPage('settings');
          }}
        >
          <div
            data-tip='Settings'
            className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
            style={{ width: 46, height: 34 }}
          >
            <ReactTooltip />
            <img
              className={`filter-${
                darkmode ? 'green' : 'blue'
              }-shadow ml-3 my-2 relative`}
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
