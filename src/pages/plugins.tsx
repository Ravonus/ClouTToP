import { FC, Component } from 'react';
import ReactTooltip from 'react-tooltip';

import fs from 'fs';
import path from 'path';
import {
  HashRouter as Router,
  Route,
  NavLink,
  useHistory,
} from 'react-router-dom';
import { useState } from 'react';

import { getConfig } from '../libs/configurator';

import requireFromString from 'require-from-string';

import Card from '../components/cards/PluginCard';

import p from '../pluginImporter';
import { Suspense } from 'react';
import log from 'electron-log';

//Icons
import WarningIcon from '../assets/icons/iconmonstr-warning-10.svg';
import { useEffect } from 'react';

interface PluginsProps {
  setRoute: Function;
  setRoutePage: Function;
  sidebarCheck: Function;
  addPluginMenu: Function;
  setPage: Function;
}

export interface OptionType {
  name: string;
  logo: string;
  component: string;
  routes: string[];
  style: {};
  fileName: string;
  author: string;
  version: string;
  path: string;
  description: string;
  icons: {
    [key: string]: {
      location?: string;
    };
  };
}

const plugins: { [key: string]: any } = p;

const pluginList: { [key: string]: any } = {};

const pluginKeys = Object.keys(plugins);

pluginKeys.map((key) => {
  pluginList[key] = plugins[key];
});

let firstRun = true;

const Plugins: FC<PluginsProps> = ({
  setRoute,
  setRoutePage,
  sidebarCheck,
  addPluginMenu,
  setPage,
}) => {
  let plugins: { [key: string]: any };
  let setPlugins: any;

  [plugins, setPlugins] = useState({});

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const foundPlugins = await getConfig('application', 'plugins', 'list');
      if (foundPlugins) setPlugins(foundPlugins);
    })();
  }, []);

  useEffect(() => {
    if (!firstRun) return;
    Object.keys(plugins).map((key: string) => {
      const opt: OptionType = plugins[key];
      let logo;
      if (opt.logo) {
        const logoPath = path.resolve(`${opt.path}/assets${opt.logo}`);

        logo = fs.readFileSync(logoPath, { encoding: 'base64' });
      }

      let menu = {
        name: opt.name,
        parent: true,
        routes: opt.routes,
        el: (
          <NavLink
            id={opt.name}
            onClick={() => setPage(`plugins_${opt.name}`)}
            className='navButton pluginButton'
            to={`plugins_${opt.name}`}
          >
            <div
              data-tip={opt.name}
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
                  ...opt.style,
                }}
                src={logo ? `data:image/png;base64, ${logo}` : WarningIcon}
                alt='W'
              />
            </div>{' '}
          </NavLink>
        ),
      };

      // opt.icons.map(() => {

      // })

      // addPluginMenu(menu);
      setTimeout(() => {
        addPluginMenu(menu);
        setRoutePage(opt.component, pluginList[opt.component]);
        setRoute(opt);

        const el: any = document.querySelector('#DashboardButton');
        if (el) el.click();

        const elp: any = document.querySelector('#PluginsButton');
        if (elp) elp.click();

        // history.push('#/dashboard');
        // history.push('#/plugins');
      }, 50);

      // const el: any = document.querySelector('#DashboardButton');
      // if (el) el.click();

      // const elp: any = document.querySelector('#PluginsButton');
      // if (elp) elp.click();

      // history.push('#/dashboard');
      // history.push('#/plugins');

      try {
        const config = JSON.parse(
          fs.readFileSync(`${opt.path}/config.json`, 'utf-8')
        );
      } catch (e) {
        log.error(`Error with configuration file for plugin ${opt.name}`);
      }

      opt.path = `/plugins_${opt.name}`;

      //

      firstRun = false;
    });
  }, [plugins]);

  return (
    <div className='container grid grid-cols-3 gap-4'>
      {Object.keys(plugins).map((key: string) => {
        const opt: OptionType = plugins[key];
        return (
          <div key={`plugin-${opt.name}`}>
            {/* <WallpaperPage /> */}
            {/* <Suspense
              key={`${opt.name}-r`}
              fallback={<div className='h-screen'>terds</div>}
            >
              <Route
                render={(props) => {
                  return (
                    <>
                      <C {...props} />
                    </>
                  );
                }}
                path={`/plugins/${opt.name}`}
              />
            </Suspense> */}

            <Card sidebarCheck={sidebarCheck} opt={opt} />
          </div>
        );
      })}
    </div>
  );
};

export default Plugins;
