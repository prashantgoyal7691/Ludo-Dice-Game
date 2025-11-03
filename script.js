(function () {
  const playBtn = document.getElementById('play-btn');
  const startScreen = document.getElementById('start-screen');
  const gameScreen = document.getElementById('game-screen');
  const numbersContainer = document.getElementById('numbers');
  const errorEl = document.getElementById('error');
  const scoreEl = document.getElementById('score');
  const diceImg = document.getElementById('dice-img');
  const diceWrapper = document.getElementById('dice');
  const resetBtn = document.getElementById('reset-btn');
  const rulesBtn = document.getElementById('rules-btn');
  const rulesPanel = document.getElementById('rules');

  let score = 0;
  let selectedNumber = undefined;
  let currentDice = 1;
  let showRules = false;

  function renderNumbers() {
    numbersContainer.innerHTML = '';
    for (let i = 1; i <= 6; i++) {
      const box = document.createElement('div');
      box.className = 'number-box' + (selectedNumber === i ? ' selected' : '');
      box.textContent = i;
      box.addEventListener('click', () => {
        selectedNumber = i;
        errorEl.textContent = '';
        renderNumbers();
      });
      numbersContainer.appendChild(box);
    }
  }

  function updateScoreDisplay() {
    scoreEl.textContent = score;
  }

  function setDiceImage(n) {
    const pngPath = `images/dice_${n}.png`;
    const svgPath = `images/dice_${n}.svg`;
    diceImg.src = pngPath;
    diceImg.onerror = function() {
      this.onerror = null;
      this.src = svgPath;
    }
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function roleDice() {
    if (!selectedNumber) {
      errorEl.textContent = 'You have not selected any number';
      return;
    }
    const randomNumber = generateRandomNumber(1, 7);
    currentDice = randomNumber;
    setDiceImage(currentDice);

    if (selectedNumber === randomNumber) {
      score += randomNumber;
    } else {
      score -= 2;
    }
    selectedNumber = undefined;
    renderNumbers();
    updateScoreDisplay();
  }

  function resetScore() {
    score = 0;
    updateScoreDisplay();
  }

  function toggleRules() {
    showRules = !showRules;
    rulesPanel.classList.toggle('hidden', !showRules);
    rulesBtn.textContent = showRules ? 'Hide Rules' : 'Show Rules';
  }

  // Events
  playBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
  });

  diceWrapper.addEventListener('click', roleDice);
  resetBtn.addEventListener('click', resetScore);
  rulesBtn.addEventListener('click', toggleRules);

  // initial render
  renderNumbers();
  updateScoreDisplay();
  setDiceImage(currentDice);
})();