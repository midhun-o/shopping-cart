import React from 'react';

interface ButtonProps {
  buttonText: string;
  className?: string; // Make className optional
}

const FormButton: React.FC<ButtonProps> = ({ buttonText, className = '' }) => {
  return (
    <button
      type="submit"
      className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 ${className}`}
    >
      {buttonText}
    </button>
  );
};

FormButton.defaultProps = {
  className: '', 
};

export default FormButton;
