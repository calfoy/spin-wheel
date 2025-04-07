import { Wheel } from '../dist/spin-wheel-esm.js';
import { loadFonts, loadImages } from '../scripts/util.js';
import { props } from './props.js';

window.onload = async () => {
  // Load all fonts used in the items
  await loadFonts(props.map(p => p.itemLabelFont));

  const wheel = new Wheel(document.querySelector('.wheel-wrapper'));
  const images = [];

  // Load all images used in the wheel and items
  const currentProps = props[0]; // Use the first props object (Money theme)
  
  images.push(initImage(currentProps, 'image'));
  images.push(initImage(currentProps, 'overlayImage'));

  for (const item of currentProps.items) {
    images.push(initImage(item, 'image'));
  }

  await loadImages(images);

  // Show the wheel only after everything is loaded
  document.querySelector('.wheel-wrapper').style.visibility = 'visible';

  // Initialize the wheel with selected properties
  wheel.init(currentProps);

  // Save the wheel to window for debugging (optional)
  window.wheel = wheel;

  const btnSpin = document.querySelector('button');
  let modifier = 0;

  window.addEventListener('click', (e) => {
    if (e.target === btnSpin) {
      const { duration, winningItemRotaion } = calcSpinToValues();
      wheel.spinTo(winningItemRotaion, duration);
    }
  });

  // Helper to calculate a random spin target
  function calcSpinToValues() {
    const duration = 3000; // 3 seconds
    const winningItemRotaion = getRandomInt(360, 360 * 1.75) + modifier;
    modifier += 360 * 1.75;
    return { duration, winningItemRotaion };
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function initImage(obj, pName) {
    if (!obj[pName]) return null;
    const i = new Image();
    i.src = obj[pName];
    obj[pName] = i;
    return i;
  }
};
