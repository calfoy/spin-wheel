import { Wheel } from '../dist/spin-wheel-esm.js';
import { loadFonts, loadImages } from '../scripts/util.js';
import { props } from './props.js';

window.onload = async () => {
  // Use the 'Money' theme — it's the 4th in your array
  const moneyProps = props[3];

  // Load required fonts
  await loadFonts([moneyProps.itemLabelFont]);

  const wheel = new Wheel(document.querySelector('.wheel-wrapper'));
  const images = [];

  // Load wheel-level images
  images.push(initImage(moneyProps, 'image'));
  images.push(initImage(moneyProps, 'overlayImage'));

  // Load item-level images (if any — this theme uses labels, mostly)
  for (const item of moneyProps.items) {
    images.push(initImage(item, 'image'));
  }

  await loadImages(images);

  // Show wheel only after everything loads
  document.querySelector('.wheel-wrapper').style.visibility = 'visible';

  // Initialize the wheel with the money theme
  wheel.init(moneyProps);

  // Save to window for debugging (optional)
  window.wheel = wheel;

  const btnSpin = document.querySelector('button');
  let modifier = 0;

  window.addEventListener('click', (e) => {
    if (e.target === btnSpin) {
      const { duration, winningItemRotaion } = calcSpinToValues();
      wheel.spinTo(winningItemRotaion, duration);
    }
  });

  function calcSpinToValues() {
    const duration = 3000; // Spin duration in ms
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
