import React, { FC } from 'react';

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  return (
    <div className='fixed border-t border-b border-transparent group-hover:border-primary  group-focus:border-red-primary border-l w-8 h-screen bg-gray-300 dark:bg-gray-500'></div>
  );
};

export default Menu;
