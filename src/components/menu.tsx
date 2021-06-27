import React, { FC } from 'react';

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  return (
    <div className='fixed border-t-2 border-b-2 border-transparent group-hover:border-primary border-l-2 w-8 h-screen bg-gray-300 dark:bg-gray-500'></div>
  );
};

export default Menu;
