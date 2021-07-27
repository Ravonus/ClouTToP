import { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const GreenButton: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
      type='button'
    >
      {text}
    </button>
  );
};

export default GreenButton;
