import {Wheel} from '../dist/spin-wheel-esm.js';

window.onload = () => {
  // Create 49 "Thank You" segments and 1 "$5" segment
  const segments = Array(49).fill({ 
    label: 'Thank You', 
    color: '#36A2EB' 
  }).concat({
    label: '$5 🎉', 
    color: '#FFCE56',
    size: 2 // Makes winning segment slightly more prominent
  });

  const container = document.querySelector('.wheel-wrapper');
  window.wheel = new Wheel(container, {
    items: segments,
    rotationSpeedMax: 10, // Faster initial spin
    itemLabelRadius: 0.7,
    dragToSpin: false, // Disable drag-to-spin
    spinTime: 5, // Duration in seconds
    spinEasing: 'Cubic.easeOut' // Smooth slowdown
  });

  // Spin button logic
  document.getElementById('spin-button').addEventListener('click', () => {
    // Randomly select a stopping position (1 in 50 chance for $5)
    const targetSegment = Math.random() < 0.02 ? 49 : Math.floor(Math.random() * 49);
    const stopAngle = (360 / 50) * targetSegment + 1800; // 5 full rotations + offset
    
    window.wheel.spinTo(stopAngle); // Land precisely on the chosen segment
    
    // Disable button after spin
    const btn = document.getElementById('spin-button');
    btn.disabled = true;
    btn.textContent = 'Spin Used';
  });
};


window.wheel.callback = (winner) => {
  if (winner.label.includes('$5')) {
    alert("Congratulations! You won $5!");
    // Optional: Add confetti (see next section)
  }
};
