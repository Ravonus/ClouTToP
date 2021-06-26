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

//Import Styles
//import './App.scss';

const routes = [{ name: 'Main', link: '/', component: 'Main' }];

const routePages: { [key: string]: any } = {
  Main,
};

function App() {
  return (
    <div>
      <main className='relative'>
        <div className='flex flex-col justify-between'>
          <div className='bg-gray-100 dark:bg-gray-500 h-screen'>
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
