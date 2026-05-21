const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const movesElement = document.querySelector('.moves');
const modal = document.querySelector('.modal');
const resultMessage = document.querySelector('.result-message');
const restartButton = document.querySelector('.restart-button');
const playAgainButton = document.querySelector('.play-again-button');

const characters = [
  'lustro negro',
  'dragão branco',
  'dark macician girl',
  'neos',
  'black rose',
  'cyber dragon',
  'red eyes',
  'mago negro',
  'utopia 39',
  'odd eyes',
  'buster blade',
  'mago do tempo',
  'kuriboh',
  'firewall dragon',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);

  element.className = className;

  return element;
};

let firstCard = '';
let secondCard = '';
let moves = 0;
let loop;

const resetCards = () => {
  firstCard = '';
  secondCard = '';
};

const updateMoves = () => {
  moves += 1;

  if (movesElement) {
    movesElement.innerHTML = moves;
  }
};

const showEndGameModal = () => {

  clearInterval(loop);

  if (resultMessage) {

    resultMessage.innerHTML = `
      Parabéns, <strong>${spanPlayer.innerHTML}</strong>!<br>
      Você finalizou o duelo em <strong>${timer.innerHTML}s</strong><br>
      com <strong>${moves}</strong> jogadas.
    `;

  }

  if (modal) {
    modal.classList.remove('hidden');
  }

};

const checkEndGame = () => {

  const disabledCards =
    document.querySelectorAll('.disabled-card');

  if (disabledCards.length === characters.length * 2) {

    setTimeout(() => {

      showEndGameModal();

    }, 700);

  }

};

const checkCards = () => {

  const firstCharacter =
    firstCard.getAttribute('data-character');

  const secondCharacter =
    secondCard.getAttribute('data-character');

  updateMoves();

  if (firstCharacter === secondCharacter) {

    firstCard.classList.add('disabled-card');
    secondCard.classList.add('disabled-card');

    firstCard.classList.add('matched-card');
    secondCard.classList.add('matched-card');

    resetCards();

    checkEndGame();

    return;

  }

  setTimeout(() => {

    firstCard.classList.remove('reveal-card');
    secondCard.classList.remove('reveal-card');

    resetCards();

  }, 700);

};

const revealCard = ({ target }) => {

  const card = target.parentNode;

  if (
    card.classList.contains('reveal-card') ||
    card.classList.contains('disabled-card') ||
    secondCard !== ''
  ) {
    return;
  }

  card.classList.add('reveal-card');

  if (firstCard === '') {

    firstCard = card;

    return;

  }

  secondCard = card;

  checkCards();

};

const createCard = (character) => {

  const card = createElement('div', 'card');

  const front = createElement('div', 'face front');

  const back = createElement('div', 'face back');

  front.style.backgroundImage =
    `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);

  card.setAttribute('data-character', character);

  return card;

};

const loadGame = () => {

  grid.innerHTML = '';

  const duplicateCharacters =
    [...characters, ...characters];

  const shuffledArray =
    duplicateCharacters.sort(
      () => Math.random() - 0.5
    );

  shuffledArray.forEach((character) => {

    const card = createCard(character);

    grid.appendChild(card);

  });

};

const startTimer = () => {

  clearInterval(loop);

  timer.innerHTML = 0;

  loop = setInterval(() => {

    const currentTime =
      Number(timer.innerHTML);

    timer.innerHTML = currentTime + 1;

  }, 1000);

};

const restartGame = () => {

  firstCard = '';
  secondCard = '';

  moves = 0;

  if (movesElement) {
    movesElement.innerHTML = 0;
  }

  if (modal) {
    modal.classList.add('hidden');
  }

  startTimer();

  loadGame();

};

if (restartButton) {

  restartButton.addEventListener(
    'click',
    restartGame
  );

}

if (playAgainButton) {

  playAgainButton.addEventListener(
    'click',
    restartGame
  );

}

window.onload = () => {

  spanPlayer.innerHTML =
    localStorage.getItem('player') || 'Duelista';

  if (movesElement) {
    movesElement.innerHTML = 0;
  }

  startTimer();

  loadGame();

};