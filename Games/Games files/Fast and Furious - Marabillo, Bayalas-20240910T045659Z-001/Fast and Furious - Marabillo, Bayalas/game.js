const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
const muteButton = document.getElementById('muteButton');
const startButton = document.getElementById('startButton'); 
const bgMusic = document.getElementById('bgMusic');

let playerPosition = gameArea.offsetWidth / 2 - player.offsetWidth / 2;
let score = 0;
let isGameOver = false;
let isMuted = false;
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;
let moveSpeed = 5;
let obstacleIntervalId;
let obstacleSpeed = 5;
let obstacleInterval = 1000;

function movePlayer() {
    if (isMovingLeft) {
        playerPosition -= moveSpeed;
    }
    if (isMovingRight) {
        playerPosition += moveSpeed;
    }
    if (isMovingUp) {
        player.style.top = `${Math.max(0, player.offsetTop - moveSpeed)}px`;
    }
    if (isMovingDown) {
        player.style.top = `${Math.min(gameArea.offsetHeight - player.offsetHeight, player.offsetTop + moveSpeed)}px`;
    }
    
    playerPosition = Math.max(0, Math.min(gameArea.offsetWidth - player.offsetWidth, playerPosition));
    player.style.left = `${playerPosition}px`;

    if (!isGameOver) {
        requestAnimationFrame(movePlayer);
    }
}

function createObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * (gameArea.offsetWidth - 40)}px`;
    gameArea.appendChild(obstacle);

    let obstacleTop = 0;
    const obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }

        obstacleTop += obstacleSpeed;
        obstacle.style.top = `${obstacleTop}px`;

        if (obstacleTop > gameArea.offsetHeight) {
            obstacle.remove();
            clearInterval(obstacleInterval);
            score += 10;
            scoreDisplay.textContent = `Score: ${score}`;


            if (score % 100 === 0) {
                increaseDifficulty();
            }
        }

        const obstacleRect = obstacle.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            obstacleRect.left < playerRect.right &&
            obstacleRect.right > playerRect.left &&
            obstacleRect.bottom > playerRect.top &&
            obstacleRect.top < playerRect.bottom
        ) {
            gameOver();
            clearInterval(obstacleInterval);
        }
    }, 20);
}

function increaseDifficulty() {
    obstacleSpeed += 1; 
    clearInterval(obstacleIntervalId); 
    obstacleInterval = Math.max(200, obstacleInterval - 100); 
    obstacleIntervalId = setInterval(createObstacle, obstacleInterval); 
}

function gameOver() {
    isGameOver = true;
    bgMusic.pause();
    alert(`Game Over! Final Score: ${score}`);
}

function restartGame() {
    location.reload(); 
}

function toggleMute() {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    const icon = muteButton.querySelector('i');
    
    if (isMuted) {
        icon.classList.remove('fa-volume-up');
        icon.classList.add('fa-volume-mute');
    } else {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    }
}

muteButton.addEventListener('click', toggleMute);


document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    if (e.key === 'ArrowLeft') isMovingLeft = true;
    if (e.key === 'ArrowRight') isMovingRight = true;
    if (e.key === 'ArrowUp') isMovingUp = true;
    if (e.key === 'ArrowDown') isMovingDown = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') isMovingLeft = false;
    if (e.key === 'ArrowRight') isMovingRight = false;
    if (e.key === 'ArrowUp') isMovingUp = false;
    if (e.key === 'ArrowDown') isMovingDown = false;
});



restartButton.addEventListener('click', restartGame);
muteButton.addEventListener('click', toggleMute);
startButton.addEventListener('click', startGame);

function startGame() {
    startButton.style.display = 'none'; 
    bgMusic.play();
    obstacleIntervalId = setInterval(createObstacle, obstacleInterval);
    movePlayer(); 
}

