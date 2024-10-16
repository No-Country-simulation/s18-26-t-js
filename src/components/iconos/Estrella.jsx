import React from 'react';

export default function Estrella({ color = '#A0A0A0' }) {
  return (
    <svg
      className='drop-shadow'
      xmlns='http://www.w3.org/2000/svg'
      id='Layer_1'
      fill={color}
      data-name='Layer 1'
      viewBox='0 0 24 24'
      width='22'
      height='22'
    >
      <path d='M19.467,23.316,12,17.828,4.533,23.316,7.4,14.453-.063,9H9.151L12,.122,14.849,9h9.213L16.6,14.453Z' />
    </svg>
  );
}
