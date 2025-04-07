import {Wheel} from '../dist/spin-wheel-esm.js';

window.onload = () => {
  // Create segments (1 winner, 49 "Thank You")
  const segments = Array(49).fill({ 
    label: 'Thank You', 
    color: '#36A2EB' 
  }).concat({
    label: '$5 🎉', 
    color: '#FFCE56',
    size: 2 
  });

  const props = {
    items: segments,
    rotationSpeedMax: 8,
    itemLabelRadius: 0.7
  };

  const container = document.querySelector('.wheel-wrapper');
  window.wheel = new Wheel(container, props);

  const spinButton = document.getElementById('spin-button');
  let hasSpun = false; // Track if spun already

  spinButton.addEventListener('click', () => {
    if (hasSpun) {
      alert("You've already spun the wheel!"); // Block re-spins
      return;
    }

    window.wheel.spin();
    hasSpun = true; // Mark as spun
    
    // Disable button visually
    spinButton.disabled = true;
    spinButton.style.opacity = '0.6';
    spinButton.textContent = 'Already Spun';
  });
};
