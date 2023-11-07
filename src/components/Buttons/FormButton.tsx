import React from 'react';
import './FormButton.css';

interface ButtonProps {
  buttonText: string;
}

const FormButton: React.FC<ButtonProps> = function ({ buttonText }) {
  return (
    <button className="form-button" type="submit">
      {buttonText}
    </button>
  );
};

export default FormButton;
