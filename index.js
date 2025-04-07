import {Wheel} from '../../../dist/spin-wheel-esm.js';

window.onload = () => {

  const props = {
    items: [
      { label: '$5', color: '#FFCE56' },    // Prize 1 (red)
      { label: 'Thank You', color: '#4BC0C0' }, // No prize (blue)
      { label: 'Thank You', color: '#4BC0C0' },    // Prize 2 (yellow)
      { label: 'Thank You', color: '#4BC0C0' }, // No prize (teal)
      { label: 'Thank You', color: '#4BC0C0' }     // Prize 3 (purple)
    ],
  };

  const container = document.querySelector('.wheel-wrapper');

  window.wheel = new Wheel(container, props);

};
