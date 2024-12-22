const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballRadius = 30;
let ballX = Math.random() * canvas.width;
let ballY = -ballRadius;
let ballSpeed = 3;
let ballDirection = 1; // 1 for falling down, -1 for going up
let playerWidth = 100;
let playerHeight = 20;
let playerX = (canvas.width - playerWidth) / 2;
let playerSpeed = 10;
let rightPressed = false;
let leftPressed = false;
let score = 0;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer() {
    ctx.beginPath();
    ctx.rect(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    ballY += ballSpeed * ballDirection;

    // Ball collision with the top or bottom of the screen
    if (ballY + ballRadius > canvas.height) {
        if (ballX > playerX && ballX < playerX + playerWidth) {
            score++;
            ballY = -ballRadius; // Reset ball position
            ballX = Math.random() * canvas.width; // Random new X position
        } else {
            ballDirection = -ballDirection;
            score = 0; // Reset score if missed
        }
    }
}

function movePlayer() {
    if (rightPressed && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    } else if (leftPressed && playerX > 0) {
        playerX -= playerSpeed;
    }
}

function drawScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPlayer();
    moveBall();
    movePlayer();
    drawScore();

    requestAnimationFrame(draw);
}

draw();
