import React, { DetailedHTMLProps, FC } from 'react';

import Plugins from '../assets/icons/iconmonstr-brick-8.svg';

interface ToolTipProps {
  script: any;
}

const load = () => {
  console.log('I AM RUNNING DUDE');

  return (
    <div className='relative flex flex-col items-center group'>
      {' '}
      THE POOP AND HIRE!
    </div>
  );
};

const ToolTip: FC<ToolTipProps> = ({ script }) => {
  return eval(script)();
};

export default ToolTip;
