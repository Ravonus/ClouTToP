/**
 * @author Chad Koslovsky
 * @email Chad@biofi.tech
 * @create date 2021-05-08 16:28:16
 * @modify date 2021-05-08 16:33:08
 * @desc [Main React App - This will load all other pages and components]
 * @desc - Heart loading is not required for website to load. Website is packed and statically served and loads very fast
 */

import {
  HashRouter as Router,
  Route,
  NavLink,
  matchPath,
  HashRouterProps,
} from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

//Pages
import Dashboard from './pages/dashboard';
import Help from './pages/help';
import About from './pages/about';
import Settings from './pages/settings';
import Plugins from './pages/plugins';

import { loadStore } from './libs/store';

//Components
import Menu from './components/sidebar';
import Top from './components/topBar';

//Icons
import PluginsIcon from './assets/icons/iconmonstr-brick-8.svg';
import HelpIcon from './assets/icons/iconmonstr-help-1.svg';
import AboutIcon from './assets/icons/iconmonstr-construction-8.svg';
import DashboardIcon from './assets/icons/iconmonstr-dashboard-4.svg';
import plugins from './pluginImporter';
import { wait } from './functions';

//Import Styles
//import './App.scss';

// const routes = [
//   { name: 'Dashboard', link: '/dashboard', component: 'Dashboard' },
//   { name: 'Help', link: '/help', component: 'Help' },
//   { name: 'About', link: '/about' },
//   { name: 'Settings', link: '/settings' },
//   { name: 'Plugins', link: '/plugins' },
// ];

let routePages: { [key: string]: any } = {};

let setRoutePages: any;

const dm = loadStore('darkmode');

async function checkActive() {
  const navButtons = document.querySelectorAll('.navButton');
  navButtons.forEach((button) => {
    const classList = button.classList;
    const active = [...classList].includes('active');
    if (active)
      button
        .querySelector('div')
        ?.classList.add(
          'dark:bg-gray-700',
          'bg-gray-200',
          'border-l-4',
          'hover:border-secondary',
          'dark:hover:border-primary',
          'dark:border-gray-300',
          'border-black'
        );
    else
      button
        .querySelector('div')
        ?.classList.remove(
          'dark:bg-gray-700',
          'bg-gray-200',
          'border-l-4',
          'hover:border-secondary',
          'dark:hover:border-primary',
          'dark:border-gray-300',
          'border-black'
        );
  });
}

async function waitForNavigation(type: 'id' | 'class', id: string) {
  let pluginButton: any;

  if (type === 'id') pluginButton = document.querySelector(`#${id}`);
  else pluginButton = document.querySelectorAll(`.${id}`);

  if (!pluginButton || (type === 'class' && pluginButton.length === 0)) {
    await wait(50);
    pluginButton = await waitForNavigation(type, id);
  }
  return pluginButton;
}

function App(props: any) {
  const [darkmode, setDarkmode] = useState(dm || false);
  const [routesLoaded, setRoutesLoaded] = useState(['']);
  const [page, setPage] = useState('dashboard');
  const [routes, setRoutes] = useState([
    { name: 'Dashboard', link: '/dashboard', component: 'Dashboard' },
    { name: 'Help', link: '/help', component: 'Help' },
    { name: 'About', link: '/about' },
    { name: 'Settings', link: '/settings' },
    { name: 'Plugins', link: '/plugins' },
  ]);
  [routePages, setRoutePages] = useState({
    Dashboard,
    Help,
    About,
    Settings,
    Plugins,
  });

  async function setRoute(value: any) {
    routes.push({
      name: value.name,
      component: value.component,
      link: value.path || value.link,
    });
    await setRoutes(routes);
  }

  async function setRoutePage(name: string, component: any) {
    console.log('routesLoaded', routesLoaded, name);

    if (routesLoaded.includes(name.toLocaleLowerCase())) {
      return;
    } else {
      routePages[name] = component;
      await setRoutePages(routePages);
      routesLoaded.push(name.toLocaleLowerCase());
      await setRoutesLoaded(routesLoaded);
    }
  }

  async function sidebarCheck() {
    const bmenu = menu;
    await setMenu({ mainMenu: [], pluginMenu: [] });

    await wait(50);
    setMenu(bmenu);
  }

  useEffect(() => {
    (async () => {
      const pluginButton: any = await waitForNavigation('id', 'PluginsButton');
      pluginButton?.click();
      //TODO: Need a way to not keep waiting if user has no plugins (Would be odd as the app does nothing without plugins)
      const allPluginButtons: any = await waitForNavigation(
        'class',
        'pluginButton'
      );

      allPluginButtons?.forEach((el: any) => {
        el.click();
      });

      const dashboardButton: any = await waitForNavigation(
        'id',
        'DashboardButton'
      );

      await wait(100);
      dashboardButton?.click();
    })();
  }, []);

  function mainMenuGenerator(swap?: boolean) {
    return [
      {
        // routes: ['dashboard', 'help', 'plugins'],
        el: (
          <NavLink
            onClick={() => setPage('dashboard')}
            className='navButton'
            to='/dashboard'
          >
            <div
              id='DashboardButton'
              data-tip='Dashboard'
              className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
              style={{ width: 46, height: 34 }}
            >
              <ReactTooltip />
              <img
                className={`filter-${
                  darkmode && !swap
                    ? 'green'
                    : darkmode && swap
                    ? 'blue'
                    : !darkmode && !swap
                    ? 'blue'
                    : 'green'
                }-shadow ml-3 my-2 relative`}
                style={{ width: 24, height: 24, top: 5 }}
                src={DashboardIcon}
                alt='P'
              />
            </div>
          </NavLink>
        ),
      },
      {
        el: (
          <NavLink
            onClick={() => setPage('plugins')}
            className='navButton'
            to='/plugins'
          >
            <div
              id='PluginsButton'
              data-tip='Plugins'
              className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
              style={{ width: 46, height: 34 }}
            >
              <ReactTooltip />
              <img
                className={`filter-${
                  darkmode && !swap
                    ? 'green'
                    : darkmode && swap
                    ? 'blue'
                    : !darkmode && !swap
                    ? 'blue'
                    : 'green'
                }-shadow ml-3 my-2 relative`}
                style={{ width: 24, height: 24, top: 5 }}
                src={PluginsIcon}
                alt='P'
              />
            </div>
          </NavLink>
        ),
      },
      {
        el: (
          <NavLink
            onClick={() => setPage('about')}
            className='navButton'
            to='About'
          >
            <div
              data-tip='About'
              className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
              style={{ width: 46, height: 34 }}
            >
              <ReactTooltip />
              <img
                className={`filter-${
                  darkmode && !swap
                    ? 'green'
                    : darkmode && swap
                    ? 'blue'
                    : !darkmode && !swap
                    ? 'blue'
                    : 'green'
                }-shadow ml-3 my-2 relative`}
                style={{ width: 24, height: 24, top: 5 }}
                src={AboutIcon}
                alt='A'
              />
            </div>
          </NavLink>
        ),
      },
      {
        el: (
          <NavLink
            onClick={() => setPage('help')}
            className='navButton'
            to='/help'
          >
            <div
              data-tip='Help'
              className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
              style={{ width: 46, height: 34 }}
            >
              <ReactTooltip />
              <img
                className={`filter-${
                  darkmode && !swap
                    ? 'green'
                    : darkmode && swap
                    ? 'blue'
                    : !darkmode && !swap
                    ? 'blue'
                    : 'green'
                }-shadow ml-3 my-2 relative`}
                style={{ width: 24, height: 24, top: 5 }}
                src={HelpIcon}
                alt='H'
              />
            </div>{' '}
          </NavLink>
        ),
      },
    ];
  }

  const menus: any = {
    mainMenu: mainMenuGenerator(),
    pluginMenu: [],
  };

  const [menu, setMenu] = useState(menus);

  async function darkmodeCheck(value: boolean) {
    await setDarkmode(value);

    setMenu({ mainMenu: mainMenuGenerator(true), pluginMenu: menu.pluginMenu });
  }

  async function addPluginMenu(pluginMenu: any, id: string) {
    let found = false;

    menu.pluginMenu.map((localMenu: any) => {
      if (localMenu.name === pluginMenu.name) found = true;
    });

    if (found) return;

    menu.pluginMenu.push(pluginMenu);
    // menus.pluginMenu.push(pluginMenu);

    await wait(100);
    if (menu.mainMenu.length > 0) setMenu(menu);
    const el: any = document.querySelector('#DashboardButton');
    if (el) el.click();

    const elPlug: any = document.querySelector('#PluginsButton');
    if (elPlug) elPlug.click();

    const el2: any = document.querySelector(`#${pluginMenu.pluginName}`);
    if (el2) el2.click();
  }

  useEffect(() => {
    checkActive();
  }, [page]);

  const checkLoadedRoutes: string[] = [];

  return (
    <div>
      <main className={`${darkmode ? 'dark' : ''}`}>
        <Router>
          <Top
            setDarkmode={setDarkmode}
            darkmode={darkmode}
            darkmodeCheck={darkmodeCheck}
          />
          <Menu darkmode={darkmode} setPage={setPage} navInfo={menu} />
          <div className='h-screen bg-gray-200 dark:bg-gray-700 border-transparent group-hover:border-primary border-2'>
            <div className='container pt-8'>
              {routes.map((link) => {
                if (checkLoadedRoutes.includes(link.link)) return;
                checkLoadedRoutes.push(link.link);
                const Component =
                  routePages[link.component ? link.component : link.name];
                return (
                  <Route
                    key={link.name}
                    render={(props) => {
                      return (
                        <Component
                          checkActive={checkActive}
                          sidebarCheck={sidebarCheck}
                          setPage={setPage}
                          addPluginMenu={addPluginMenu}
                          setRoute={setRoute}
                          setRoutePage={setRoutePage}
                          {...props}
                        />
                      );
                    }}
                    path={link.link}
                    exact
                  />
                );
              })}
            </div>
          </div>
        </Router>
      </main>
    </div>
  );
}

export default App;
