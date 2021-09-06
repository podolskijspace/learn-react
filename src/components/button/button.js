import React from 'react';

const Button = ({onClick}) => {
  return <button onClick={() => onClick()} >Toggle random char </button>;
}

export default Button;