import React from 'react';

const DeleteRandomChar = ({onDeleteRandomChar}) => {
  return <button onClick={() => onDeleteRandomChar()} >Toggle random char </button>;
}

export default DeleteRandomChar;