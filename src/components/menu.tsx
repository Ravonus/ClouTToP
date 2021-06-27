import React, { FC } from 'react';

import Plugins from '../assets/icons/iconmonstr-brick-8.svg';

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  return (
    <div className='fixed border-t-2 border-b-2 border-transparent group-hover:border-primary border-l-2 w-8 h-screen bg-gray-300 dark:bg-gray-500'>
      <img
        className='filter-green'
        style={{ width: 18, height: 18 }}
        src={Plugins}
        alt='X'
      />
    </div>
  );
};

export default Menu;
