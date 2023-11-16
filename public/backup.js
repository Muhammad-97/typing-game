var score = 0;
var timer = 60;
var level = '';
var letters = [];
function showLevels() {
    var startPageHide = document.querySelector('.start-page');
    startPageHide.style.display = 'none';
    var displayLevels = document.querySelector('.level-selection');
    displayLevels.style.display = 'block';
}
function selectLevel(selectedLevel) {
    level = selectedLevel;
    var hideLevelsbox = document.querySelector('.level-selection');
    hideLevelsbox.style.display = 'none';
    var gameScreen = document.querySelector('.game-page');
    gameScreen.style.display = 'block';
    document.getElementById('level').innerText = level;
    startTimer();
    createLetters();
}
function startTimer() {
    var timerElement = document.getElementById('timer');
    var countdown = setInterval(function () {
        timer--;
        timerElement.innerText = timer.toString();
        if (timer <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}
function createLetters() {
    var letterInterval;
    function generateAndAnimateLetter() {
        var letter = generateRandomLetter();
        var letterElement = document.createElement('span');
        letterElement.className = 'letter';
        letterElement.innerText = letter;
        var elementWidth = letterElement.clientWidth;
        var maxXPos = window.innerWidth - elementWidth;
        
        var xPos = Math.random() * maxXPos;
        var yPos = window.innerHeight;
        letterElement.style.left = "".concat(xPos, "px");
        letterElement.style.top = "".concat(yPos, "px");
        document.getElementById('letters').appendChild(letterElement);
        letters.push({
            element: letterElement,
            letter: letter,
            xPos: xPos,
            yPos: yPos,
        });
        animateLetter(letterElement, yPos);
    }
    letterInterval = setInterval(generateAndAnimateLetter, getLetterInterval());
    document.addEventListener('keydown', function (e) {
        var keyPressed = e.key.toUpperCase();
        var popped = letters.findIndex(function (letterObj, index) {
            if (letterObj.letter === keyPressed) {
                letters.splice(index, 1);
                var scoreIncrease = document.getElementById('score');
                scoreIncrease.innerText = (++score).toString();
                letterObj.element.remove();
                return true;
            }
        });
        if (popped === -1) {
            var scoreDecrease = document.getElementById('score');
            scoreDecrease.innerText = (--score).toString();
        }
    });
    setTimeout(function () {
        clearInterval(letterInterval);
    }, timer * 1000);
}
function animateLetter(letterElement, yPos) {
    var animationInterval = setInterval(function () {
        yPos -= 2;
        letterElement.style.top = "".concat(yPos, "px");
        if (yPos < -30) {
            letters = letters.filter((letter) => {
                return letter.element != letterElement
            })
            clearInterval(animationInterval);
            letterElement.remove();
        }
    }, 20);
}
function generateRandomLetter() {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}
function getLetterInterval() {
    if (level === 'beginner') {
        return 1200;
    }
    else if (level === 'medium') {
        return 800;
    }
    else if (level === 'hard') {
        return 500;
    }
}
function endGame() {
    alert("Game over! Your final score is ".concat(score));
    location.reload();
}
