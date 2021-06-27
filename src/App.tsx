/**
 * @author Chad Koslovsky
 * @email Chad@biofi.tech
 * @create date 2021-05-08 16:28:16
 * @modify date 2021-05-08 16:33:08
 * @desc [Main React App - This will load all other pages and components]
 * @desc - Heart loading is not required for website to load. Website is packed and statically served and loads very fast
 */

import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  useHistory,
  withRouter,
} from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';

//Pages
import Dashboard from './pages/dashboard';
import Help from './pages/help';
import About from './pages/about';
import Settings from './pages/settings';
import Plugins from './pages/plugins';

import Store from 'electron-store';

//Components
import Menu from './components/menu';
import Top from './components/topBar';

//Icons
import PluginsIcon from './assets/icons/iconmonstr-brick-8.svg';
import HelpIcon from './assets/icons/iconmonstr-help-1.svg';
import AboutIcon from './assets/icons/iconmonstr-construction-8.svg';
import DashboardIcon from './assets/icons/iconmonstr-dashboard-4.svg';

//Import Styles
//import './App.scss';

const routes = [
  { name: 'Dashboard', link: '/dashboard', component: 'Dashboard' },
  { name: 'Help', link: '/help', component: 'Help' },
  { name: 'About', link: '/about' },
  { name: 'Settings', link: '/settings' },
  { name: 'Plugins', link: '/plugins' },
];

const routePages: { [key: string]: any } = {
  Dashboard,
  Help,
  About,
  Settings,
  Plugins,
};

const store = new Store();

const dm = store.get('darkmode');

function App(props: any) {
  const [darkmode, setDarkmode] = useState(dm || false);
  const [page, setPage] = useState('dashboard');

  const menus = {
    mainMenu: [
      <NavLink
        onClick={() => setPage('dashboard')}
        className='navButton'
        to='/dashboard'
      >
        <div
          data-tip='Dashboard'
          className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
          style={{ width: 46, height: 34 }}
        >
          <ReactTooltip />
          <img
            className='filter-green ml-3 my-2 relative'
            style={{ width: 24, height: 24, top: 5 }}
            src={DashboardIcon}
            alt='P'
          />
        </div>
      </NavLink>,
      <NavLink
        onClick={() => setPage('plugins')}
        className='navButton'
        to='/plugins'
      >
        <div
          data-tip='Plugins'
          className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
          style={{ width: 46, height: 34 }}
        >
          <ReactTooltip />
          <img
            className='filter-green ml-3 my-2 relative'
            style={{ width: 24, height: 24, top: 5 }}
            src={PluginsIcon}
            alt='P'
          />
        </div>
      </NavLink>,
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
            className='filter-green ml-3 my-2 relative'
            style={{ width: 24, height: 24, top: 5 }}
            src={AboutIcon}
            alt='A'
          />
        </div>
      </NavLink>,
      <NavLink onClick={() => setPage('help')} className='navButton' to='/help'>
        <div
          data-tip='Help'
          className='hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer'
          style={{ width: 46, height: 34 }}
        >
          <ReactTooltip />
          <img
            className='filter-green ml-3 my-2 relative'
            style={{ width: 24, height: 24, top: 5 }}
            src={HelpIcon}
            alt='H'
          />
        </div>{' '}
      </NavLink>,
    ],
  };

  const [menu, setMenu] = useState(menus.mainMenu);

  function darkmodeCheck(value: boolean) {
    setDarkmode(value);
  }

  useEffect(() => {
    const navButtons = document.querySelectorAll('.navButton');
    navButtons.forEach((button) => {
      const active = button.classList[1];
      if (active)
        button
          .querySelector('div')
          ?.classList.add(
            'dark:bg-gray-700',
            'bg-gray-200',
            'border-l-2',
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
  }, [page]);

  return (
    <div>
      <main className={`group ${darkmode ? 'dark' : ''}`}>
        <Router>
          <Top darkmodeCheck={darkmodeCheck} />

          <Menu buttons={menu} />
          <div className='h-screen bg-gray-200 dark:bg-gray-700 border-transparent group-hover:border-primary border-2'>
            <div className='container pt-8'>
              {routes.map((link) => {
                const Component =
                  routePages[link.component ? link.component : link.name];
                return (
                  <Suspense
                    key={`${link.name}-r`}
                    fallback={<div className='h-screen'>terds</div>}
                  >
                    <Route
                      render={(props) => {
                        return (
                          <>
                            <Component {...props} />
                          </>
                        );
                      }}
                      path={link.link}
                      exact
                    />
                  </Suspense>
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
