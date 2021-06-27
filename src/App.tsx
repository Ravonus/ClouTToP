/**
 * @author Chad Koslovsky
 * @email Chad@biofi.tech
 * @create date 2021-05-08 16:28:16
 * @modify date 2021-05-08 16:33:08
 * @desc [Main React App - This will load all other pages and components]
 * @desc - Heart loading is not required for website to load. Website is packed and statically served and loads very fast
 */

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import Main from './pages/main';

import Store from 'electron-store';

import Menu from './components/menu';
import Top from './components/topBar';

//Import Styles
//import './App.scss';

const routes = [{ name: 'Main', link: '/', component: 'Main' }];

const routePages: { [key: string]: any } = {
  Main,
};

const store = new Store();

const dm = store.get('darkmode');

function App() {
  const [darkmode, setDarkmode] = useState(dm || false);

  function darkmodeCheck(value: boolean) {
    console.log('I RUNZ TOO');
    setDarkmode(value);
  }

  return (
    <div>
      <main className={`group ${darkmode ? 'dark' : ''}`}>
        <Top darkmodeCheck={darkmodeCheck} />
        <Menu />
        <div className='h-screen bg-gray-200 dark:bg-gray-700 border-transparent group-hover:border-primary border-2'>
          <div className='container pt-8'>
            <Router>
              {routes.map((link) => {
                console.log(link, 'erg');
                const Component = routePages[link.component || link.name];
                return (
                  <Suspense
                    key={`${link.name}-r`}
                    fallback={<div className='h-screen'>terds</div>}
                  >
                    <Route
                      render={(props) => {
                        return <Component {...props} />;
                      }}
                      path={link.link || '/'}
                    />
                  </Suspense>
                );
              })}
            </Router>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
