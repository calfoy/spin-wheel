import { Wheel } from '../dist/spin-wheel-esm.js';
import { loadFonts, loadImages } from '../scripts/util.js';
import { props } from './props.js';

window.onload = async () => {
  // Use the 'Money' theme — it's the 4th in your array
  const moneyProps = props[3];

  // Define 50 segments: 1 prize + 49 blanks
  moneyProps.items = [
    {
      label: '$5',
      backgroundColor: '#f23925',
      labelColor: '#ffffff',
    },
    ...Array.from({ length: 49 }, () => ({
      label: '',
      backgroundColor: '#ffffff',
      labelColor: '#ffffff',
    })),
  ];

  await loadFonts([moneyProps.itemLabelFont]);

  const wheel = new Wheel(document.querySelector('.wheel-wrapper'));
  const images = [];

  // Load wheel-level images
  images.push(initImage(moneyProps, 'image'));
  images.push(initImage(moneyProps, 'overlayImage'));

  // Load item-level images
  for (const item of moneyProps.items) {
    images.push(initImage(item, 'image'));
  }

  await loadImages(images);
  document.querySelector('.wheel-wrapper').style.visibility = 'visible';
  wheel.init(moneyProps);

  // Disable drag interaction
  wheel.canvas.style.pointerEvents = 'none';

  window.wheel = wheel;

  const btnSpin = document.querySelector('button');
  const messageBox = document.getElementById('result-message');
  let hasSpun = false;
  let targetWinIndex = null;

  window.addEventListener('click', (e) => {
    if (e.target === btnSpin && !hasSpun) {
      hasSpun = true;

      // Disable button
      btnSpin.disabled = true;
      btnSpin.style.opacity = '0.5';
      btnSpin.style.cursor = 'not-allowed';
      btnSpin.textContent = 'Good Luck!';

      // Spin the wheel
      const { duration, winningItemRotation, winIndex } = calcSpinToValues();
      targetWinIndex = winIndex;
      wheel.spinTo(winningItemRotation, duration);

      // Show result message after spin ends
  setTimeout(() => {
  const messageBox = document.getElementById('result-message');
  console.log('✅ targetWinIndex:', targetWinIndex);
  console.log('✅ messageBox:', messageBox);

  if (!messageBox) {
    console.warn('⚠️ result-message element not found.');
    return;
  }

  if (targetWinIndex === 0) {
    messageBox.textContent = '🎉 You won $5!';
    messageBox.style.color = '#f23925';
  } else {
    messageBox.textContent = 'Ohhh! You missed the prize. 😢 Thanks for playing!';
    messageBox.style.color = '#666';
  }

    const result = targetWinIndex === 0 ? 'win' : 'lose';
window.parent.postMessage({ prizeResult: result }, '*');
}, duration + 300); 
        } // ✅ closes the if block
}); // ✅ closes the event listener

  function calcSpinToValues() {
    const duration = 3000;
    const totalItems = 50;
    const winIndex = Math.floor(Math.random() * totalItems);
    const degreesPerSlice = 360 / totalItems;
    const sliceOffset = degreesPerSlice / 2;
    const winningItemRotation =
      360 * 3 + (360 - (winIndex * degreesPerSlice + sliceOffset));
    return { duration, winningItemRotation, winIndex };
  }

  function initImage(obj, pName) {
    if (!obj[pName]) return null;
    const i = new Image();
    i.src = obj[pName];
    obj[pName] = i;
    return i;
  }
  }; 
