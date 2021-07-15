import path from 'path';

//require(`${remote.app.getAppPath()}/.webpack/renderer/public/pluginImporter`);

import { FC, Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { remote } from 'electron';

import fs from 'fs';

import {
  HashRouter as Router,
  Route,
  NavLink,
  useHistory,
} from 'react-router-dom';
import { useState } from 'react';

import { getConfig } from '../libs/configurator';

import requireFromString from 'require-from-string';

import Testa from '../components/PluginPage/index';

import Card from '../components/cards/PluginCard';

import pluginImporter from '../libs/pluginImporter';
import { Suspense } from 'react';
import log from 'electron-log';

//Icons
import WarningIcon from '../assets/icons/iconmonstr-warning-10.svg';
import { useEffect } from 'react';
import { ipcRenderer } from 'electron/renderer';

(global as any).__non_webpack_import__ = remote.require;

// const ffmpeg = __non_webpack_require__(
//   path.join(
//     remote.app.getAppPath(),
//     '/.webpack/renderer/public/pluginImporter.js'
//   )
// );

let terds: any;
let file: any;
try {
  // file = fs.readFileSync(
  //   path.resolve(`${remote.app.getAppPath()}/.webpack/renderer/public/terd.ts`),
  //   'utf-8'
  // );
  // requireFromString(file);
} catch (e) {
  // console.log(e);
}

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
  enabled: boolean;
  firstRun: boolean;
  registered: boolean;
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

// terds = requireFromString(file);

const plugins: { [key: string]: any } = pluginImporter;

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
      const foundPluginsOpts: any = await getConfig(
        'application',
        'plugins',
        'list'
      );
      const foundPluginDocs: any = await ipcRenderer.invoke('database', {
        model: 'Plugin',
      });
      console.log('MY DOCS', foundPluginDocs, foundPluginsOpts);

      foundPluginDocs.map((plugin: any) => {
        if (foundPluginsOpts[plugin.name])
          foundPluginsOpts[plugin.name] = {
            ...foundPluginsOpts[plugin.name],
            ...plugin,
          };
      });

      if (foundPluginsOpts) setPlugins(foundPluginsOpts);
    })();
  }, []);

  useEffect(() => {
    if (!firstRun) return;
    console.log('EEEKA', plugins);

    Object.keys(plugins).map((key: string) => {
      console.log(pluginKeys, key);

      if (!pluginKeys.includes(key)) return;

      const opt: OptionType = plugins[key];

      function installer(evt: any, message: any) {
        const newPlugins = plugins;
        setPlugins({});
        newPlugins[message.name].enabled = true;
        newPlugins[message.name].registered = true;
        newPlugins[message.name].firstRun = false;

        setPlugins(newPlugins);
      }

      ipcRenderer.removeListener(`pluginInstall-${key}`, installer);

      ipcRenderer.once(`pluginInstall-${key}`, installer);

      if (!opt.enabled) return;

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
        setRoutePage(opt, pluginList[opt.component]);
        //   setRoute(opt);

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
      {/* <Testa
        script={() => {

          const menu = [
            {
              name: 'plugins_ARPaper_scenesz',
              pluginName: 'ARPaper',
              el: (
                <NavLink
                  onClick={() => setPage(`plugins_ARPaper_scenesz`)}
                  className='navButton'
                  to='plugins_ARPaper_scenesz'
                  id='plugins_ARPaper_scenesz'
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
                      src=''
                      alt='S'
                    />
                  </div>
                </NavLink>
              ),
            },
            {
              name: 'plugins_ARPaper_libraryz',
              pluginName: 'ARPaper',
              el: (
                <NavLink
                  onClick={() => setPage(`plugins_ARPaper_libraryz`)}
                  className='navButton'
                  to='plugins_ARPaper_libraryz'
                  id='plugins_ARPaper_libraryz'
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
                      src=''
                      alt='S'
                    />
                  </div>
                </NavLink>
              ),
            },
          ];

          useEffect(() => {

            addPluginMenu(menu[1], 'plugins_ARPaper_libraryz', {
              route: {
                name: 'library2',
                path: '/plugins_ARPaper_libraryz',
                component: 'Library2',
                apiLoad: true,
                html: <div>this is a test from html</div>,
              },
              apiLoad: true,
              html: <div>this is a test from html</div>,
              component: Testa,
            });
            addPluginMenu(menu[0], 'plugins_ARPaper_scenesz', {
              route: {
                name: 'scenes2',
                path: '/plugins_ARPaper_scenesz',
                component: 'Scenes2',
                apiLoad: true,
                html: <div>this is a test from html</div>,
              },
              component: Testa,
            });
            // setRoutePage(
            //   {
            //     name: 'library',
            //     path: '/plugins_ARPaper_library',
            //     component: 'Library',
            //   },
            //   <Testa script={<div>terd3</div>}></Testa>
            // );
            // setRoutePage(
            //   {
            //     name: 'scenes',
            //     path: '/plugins_ARPaper_scenes',
            //     component: 'Scenes',
            //   },
            //   <Testa script={<div>terd4</div>}></Testa>
            // );
          }, []);

          return <></>;
        }}
      ></Testa> */}
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

//__webpack_public_path__ = `./`;
