const startContainer = document.getElementById('start-container');
const gameContainer = document.querySelector('.game-container');
const snakeSegments = [];
let food = null;
let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let dx = 0;
let dy = 0;
let score = 0;

function startGame() {
    startContainer.style.display = 'none';
    gameContainer.style.display = 'block';

    createSnake();
    placeFood();
    setInterval(moveSnake, 200);
    document.addEventListener('keydown', changeDirection);
}

function createSnake() {
    for (let i = 0; i < 3; i++) {
        const segment = document.createElement('div');
        segment.classList.add('snake-segment');
        segment.style.left = `${snakeX + i * 20}px`;
        segment.style.top = `${snakeY}px`;
        gameContainer.appendChild(segment);
        snakeSegments.push(segment);
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * 20) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;
    food = document.getElementById('food');
    food.style.left = `${foodX}px`;
    food.style.top = `${foodY}px`;
}

function moveSnake() {
  snakeX += dx;
  snakeY += dy;

  if (snakeX >= 400 || snakeX < 0 || snakeY >= 400 || snakeY < 0) {
      gameOver();
      return;
  }

  const lastSegment = snakeSegments.pop();
  lastSegment.style.left = `${snakeX}px`;
  lastSegment.style.top = `${snakeY}px`;
  snakeSegments.unshift(lastSegment);

  if (snakeX === foodX && snakeY === foodY) {
      const newSegment = document.createElement('div');
      newSegment.classList.add('snake-segment');
      newSegment.style.left = `${parseInt(snakeSegments[snakeSegments.length - 1].style.left)}px`;
      newSegment.style.top = `${parseInt(snakeSegments[snakeSegments.length - 1].style.top)}px`;
      gameContainer.appendChild(newSegment);
      snakeSegments.push(newSegment);
      placeFood();
      score++;
      if (score === 20) {
        
          restartGame(); // Reinicia o jogo quando a pontuação atingir 20
          victory();
          return;
        }
    }
}

function changeDirection(e) {
    if (e.key === 'ArrowUp' && dy !== 20) {
        dx = 0;
        dy = -20;
    }
    if (e.key === 'ArrowDown' && dy !== -20) {
        dx = 0;
        dy = 20;
    }
    if (e.key === 'ArrowLeft' && dx !== 20) {
        dx = -20;
        dy = 0;
    }
    if (e.key === 'ArrowRight' && dx !== -20) {
        dx = 20;
        dy = 0;
    }
}

function restartGame() {
    snakeX = 0;
    snakeY = 0;
    dx = 0;
    dy = 0;
    score = 0;

    // Remove todos os segmentos da cobra
    snakeSegments.forEach(segment => {
        gameContainer.removeChild(segment);
    });
    snakeSegments.length = 0;

    // Esconde os textos de "Game Over" e "Victory!"
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('victory').style.display = 'none';

    // Reinicia o jogo
    startGame();
}

function gameOver() {
    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.style.display = 'block';
}

function victory() {
    const victoryDiv = document.getElementById('victory');
    victoryDiv.style.display = 'block';
}

