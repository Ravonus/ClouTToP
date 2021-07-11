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
  useHistory,
} from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

//Pages
import Dashboard from './pages/dashboard';
import Help from './pages/help';
import About from './pages/about';
import Settings from './pages/settings';
import Plugins from './pages/plugins';

//Components
import Menu from './components/sidebar';
import Top from './components/topBar';

//Icons
import PluginsIcon from './assets/icons/iconmonstr-brick-8.svg';
import HelpIcon from './assets/icons/iconmonstr-help-1.svg';
import AboutIcon from './assets/icons/iconmonstr-construction-8.svg';
import DashboardIcon from './assets/icons/iconmonstr-dashboard-4.svg';
import plugins from './libs/pluginImporter';
import { wait } from './functions';
import { getConfig } from './libs/configurator';

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
  const [darkmode, setDarkmode] = useState(false);
  const [routesLoaded, setRoutesLoaded] = useState(['']);
  const [page, setPage] = useState('dashboard');
  const [dbLoaded, setDbLoaded] = useState(false);
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
  let history = useHistory();

  async function setRoute(value: any) {
    routes.push({
      name: value.name,
      component: value.component,
      link: value.path || value.link,
    });
    await setRoutes(routes);
  }

  function setRoutePage(opt: any, component: any) {
    const name = opt.component;
    if (routesLoaded.includes(name.toLocaleLowerCase())) {
      //  setRoute(opt);
      return;
    } else {
      routePages[name] = component;
      setRoutePages(routePages);
      routesLoaded.push(name.toLocaleLowerCase());
      setRoutesLoaded(routesLoaded);
      setRoute(opt);
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
      const dm: any = await getConfig('application', 'main', 'darkmode');
      setDarkmode(dm);
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
  }

  async function addPluginMenu(pluginMenu: any, id: string, route?: any) {
    let found = false;

    menu.pluginMenu.map((localMenu: any) => {
      if (localMenu.name === pluginMenu.name) found = true;
    });

    if (found) return;

    // menus.pluginMenu.push(pluginMenu);

    if (menu.mainMenu.length > 0) {
      const t = menu;

      t.pluginMenu = [...t.pluginMenu, pluginMenu];

      //  menu.pluginMenu.push(pluginMenu);
      setMenu(t);
    }
    //
    await wait(15);
    const el: any = document.querySelector('#DashboardButton');
    if (el) el.click();

    await wait(5);

    const elPlug: any = document.querySelector('#PluginsButton');
    if (elPlug) elPlug.click();

    await wait(5);

    const el2: any = document.querySelector(`#${pluginMenu.pluginName}`);
    if (el2) el2.click();

    await wait(100);
    if (route) setRoutePage(route.route, route.component);
  }

  useEffect(() => {
    setMenu({
      mainMenu: mainMenuGenerator(false),
      pluginMenu: menu.pluginMenu,
    });
  }, [darkmode]);

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
              {routes.map((link: any) => {
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
                          script={<div>{link.html}</div>}
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
