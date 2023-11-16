let score: number = 0;
let timer: number = 60;
let level: string = '';
let letters: { element: HTMLSpanElement; letter: string; xPos: number; yPos: number }[] = [];

function howToPlay(): void {
  let startPageHide = document.querySelector('.start-page') as HTMLElement;
  startPageHide.style.display = 'none';
  let displayLevels = document.querySelector('.how-to-play') as HTMLElement;
  displayLevels.style.display = 'flex';
}

function showLevels(): void {
  let startPageHide = document.querySelector('.how-to-play') as HTMLElement;
  startPageHide.style.display = 'none';
  let displayLevels = document.querySelector('.level-selection') as HTMLElement;
  displayLevels.style.display = 'flex';
}

function selectLevel(selectedLevel: string): void {
  level = selectedLevel;
  let hideLevelsbox = document.querySelector('.level-selection') as HTMLElement;
  hideLevelsbox.style.display = 'none';
  let gameScreen = document.querySelector('.game-page') as HTMLElement;
  gameScreen.style.display = 'flex';
  document.getElementById('level')!.innerText = level;
  startTimer();
  createLetters();
}

function startTimer(): void {
  const timerElement = document.getElementById('timer') as HTMLSpanElement;
  const countdown = setInterval(() :void =>  {
    timer--;
    timerElement.innerText = timer.toString();
    if (timer <= 0) {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

function createLetters(): void {
  let letterInterval: any;

  function generateAndAnimateLetter(): void {
    const letter = generateRandomLetter();
    const letterElement = document.createElement('span');
    letterElement.className = 'letter';
    letterElement.innerText = letter;
    
    const elementWidth = letterElement.clientWidth;
    const maxXPos = window.innerWidth - elementWidth;
    let xPos = Math.random() * maxXPos;
    let yPos = window.innerHeight;

    letterElement.style.left = `${xPos}px`;
    letterElement.style.top = `${yPos}px`;

    document.getElementById('letters')!.appendChild(letterElement);

    letters.push({
      element: letterElement,
      letter: letter,
      xPos: xPos,
      yPos: yPos,
    });

    animateLetter(letterElement, yPos);
  }

  letterInterval = setInterval(generateAndAnimateLetter, getLetterInterval());

  document.addEventListener('keydown', (e) => {
    const keyPressed: string = e.key.toUpperCase();
    const popped: number = letters.findIndex((letterObj, index): any => {
      if (letterObj.letter === keyPressed) {
        letters.splice(index, 1);
        let scoreIncrease = document.getElementById('score') as HTMLSpanElement;
        scoreIncrease.innerText = (++score).toString();
        letterObj.element.remove();
        return true;
      }
    });

    if (popped === -1) {
      let scoreDecrease = document.getElementById('score') as HTMLSpanElement;
      scoreDecrease.innerText = (--score).toString();
    }
  });

  setTimeout(() => {
    clearInterval(letterInterval);
  }, timer * 1000);
}

function animateLetter(letterElement: HTMLElement, yPos: number): void {
  let animationInterval = setInterval(() => {
    yPos -= 2;
    letterElement.style.top = `${yPos}px`;

    if (yPos < -30) {
      letters = letters.filter((letter) => {
        return letter.element != letterElement
      })
      clearInterval(animationInterval);
      letterElement.remove();
    }
  }, 20);
}

function generateRandomLetter(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function getLetterInterval(): number | undefined {
  if (level === 'beginner') {
    return 1200;
  } else if (level === 'medium') {
    return 800;
  } else if (level === 'hard') {
    return 500;
  }
}

function endGame(): void {
  let gameOver = document.querySelector('.game-over-popup') as HTMLElement;
  gameOver.style.display = 'flex';
  let finalScore = document.querySelector('.final-score') as HTMLElement;
  finalScore.innerHTML = `<div>Game over! Your final score is <span class="score">${score}</span></div>`;
  let gamePageView = document.querySelector('.game-page') as HTMLElement;
  gamePageView.style.display = 'none';
}

function restartGame(): void {
  location.reload();
}
