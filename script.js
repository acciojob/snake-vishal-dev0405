//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreBoard = document.getElementById("score");
const pixelCount = 40;
const pixels = [];

// Initialize game board with pixels
for (let i = 0; i < pixelCount * pixelCount; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.setAttribute("id", `pixel${i}`);
  gameContainer.appendChild(pixel);
  pixels.push(pixel);
}

// Initialize food position
let foodIndex = Math.floor(Math.random() * pixels.length);
pixels[foodIndex].classList.add("food");

// Initialize snake position
let snake = [579, 580, 581];
snake.forEach(index => pixels[index].classList.add("snakeBodyPixel"));

// Initialize game variables
let direction = 1;
let score = 0;
scoreBoard.textContent = score;

// Move snake function
function moveSnake() {
  // Remove tail and get head position
  const tail = snake.pop();
  pixels[tail].classList.remove("snakeBodyPixel");
  const head = snake[0];

  // Calculate new head position
  switch (direction) {
    case 1:
      if (head % pixelCount === pixelCount - 1) {
        // Hit right wall, wrap to left wall
        snake.unshift(head - pixelCount + 1);
      } else {
        snake.unshift(head + 1);
      }
      break;
    case -1:
      if (head % pixelCount === 0) {
        // Hit left wall, wrap to right wall
        snake.unshift(head + pixelCount - 1);
      } else {
        snake.unshift(head - 1);
      }
      break;
    case pixelCount:
      if (head < pixelCount) {
        // Hit top wall, wrap to bottom wall
        snake.unshift(head + pixelCount * (pixelCount - 1));
      } else {
        snake.unshift(head - pixelCount);
      }
      break;
    case -pixelCount:
      if (head >= pixelCount * (pixelCount - 1)) {
        // Hit bottom wall, wrap to top wall
        snake.unshift(head % pixelCount);
      } else {
        snake.unshift(head + pixelCount);
      }
      break;
  }

  // Check for collision with food
  if (snake[0] === foodIndex) {
    // Increase score and generate new food
    score++;
    scoreBoard.textContent = score;
    pixels[foodIndex].classList.remove("food");
    do {
      foodIndex = Math.floor(Math.random() * pixels.length);
    } while (pixels[foodIndex].classList.contains("snakeBody
