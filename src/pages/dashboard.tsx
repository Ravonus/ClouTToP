import { FC } from 'react';

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  return (
    <div className='text-center l flex flex-col justify justify-center dark:text-primary'>
      ERB + TAILWIND = ❤{' '}
    </div>
  );
};

export default Dashboard;
