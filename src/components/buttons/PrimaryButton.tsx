import { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export const PrimaryButton: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='text-primary bg-transparent border border-solid border-primary hover:bg-primary hover:text-white active:bg-green-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
      type='button'
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
