import { Wheel } from '../dist/spin-wheel-esm.js';
import { loadFonts, loadImages } from '../scripts/util.js';
import { props } from './props.js';

window.onload = async () => {
  // Use the 'Money' theme — it's the 4th in your array
  const moneyProps = props[3];

  // 👇 Replace items array with your custom 50-segment config
  moneyProps.items = [
    {
      label: '$5',
      backgroundColor: '#f23925',
      labelColor: '#ffffff',
    },
    ...Array.from({ length: 49 }, () => ({
      label: '',
      backgroundColor: '#ffffff',
      labelColor: '#ffffff', // You could use 'transparent' if supported
    })),
  ];

  await loadFonts([moneyProps.itemLabelFont]);

  const wheel = new Wheel(document.querySelector('.wheel-wrapper'));
  const images = [];

  // Load wheel-level images
  images.push(initImage(moneyProps, 'image'));
  images.push(initImage(moneyProps, 'overlayImage'));

  // Load item-level images (none in this setup, but left for safety)
  for (const item of moneyProps.items) {
    images.push(initImage(item, 'image'));
  }

  await loadImages(images);

  document.querySelector('.wheel-wrapper').style.visibility = 'visible';

  wheel.init(moneyProps);

  // 🚫 Disable drag/spin interaction
  wheel.canvas.style.pointerEvents = 'none';

  window.wheel = wheel;

  const btnSpin = document.querySelector('button');
  let isSpinning = false;
  let modifier = 0;

let hasSpun = false;

window.addEventListener('click', (e) => {
  if (e.target === btnSpin && !hasSpun) {
    hasSpun = true; // prevent more spins

    // Optional: disable the button visually too
    btnSpin.disabled = true;
    btnSpin.style.opacity = '0.5';
    btnSpin.style.cursor = 'not-allowed';
    btnSpin.textContent = 'Good Luck!';

    const { duration, winningItemRotaion } = calcSpinToValues();
    wheel.spinTo(winningItemRotaion, duration);
  }
});

  function calcSpinToValues() {
    const duration = 3000;
    const totalItems = 50;

    const winIndex = Math.floor(Math.random() * totalItems); // 0 to 49
    const degreesPerSlice = 360 / totalItems;
    const sliceOffset = degreesPerSlice / 2;

    const winningItemRotaion =
      360 * 3 + (360 - (winIndex * degreesPerSlice + sliceOffset)); // 3 full spins + exact slice

    return { duration, winningItemRotaion };
  }

  function initImage(obj, pName) {
    if (!obj[pName]) return null;
    const i = new Image();
    i.src = obj[pName];
    obj[pName] = i;
    return i;
  }
};
