// get the game container
const gameContainer = document.getElementById("gameContainer");

// create the snake and the food
let snake = [
  {x: 1, y: 19},
  {x: 2, y: 19},
  {x: 3, y: 19},
];
let food = {x: 10, y: 10};

// set the initial direction of the snake
let direction = "right";

// set the initial score to 0
let score = 0;

// create the pixels for the snake and the food
function createPixel(x, y, className) {
  const pixel = document.createElement("div");
  pixel.id = `pixel${x}_${y}`;
  pixel.className = `gamePixel ${className}`;
  gameContainer.appendChild(pixel);
}

// create the snake and the food pixels
for (let x = 0; x < 20; x++) {
  for (let y = 0; y < 20; y++) {
    if (x === 0 || x === 19 || y === 0 || y === 19) {
      createPixel(x, y, "borderPixel");
    } else {
      createPixel(x, y, "");
    }
  }
}
snake.forEach(segment => createPixel(segment.x, segment.y, "snakeBodyPixel"));
createPixel(food.x, food.y, "food");

// move the snake
function move() {
  // get the head and tail of the snake
  const head = snake[snake.length - 1];
  const tail = snake.shift();
  // remove the tail pixel from the game container
  document.getElementById(`pixel${tail.x}_${tail.y}`).className = "gamePixel";

  // calculate the new position of the head
  let newHead = {};
  if (direction === "up") {
    newHead.x = head.x;
    newHead.y = head.y - 1;
  } else if (direction === "down") {
    newHead.x = head.x;
    newHead.y = head.y + 1;
  } else if (direction === "left") {
    newHead.x = head.x - 1;
    newHead.y = head.y;
  } else if (direction === "right") {
    newHead.x = head.x + 1;
    newHead.y = head.y;
  }

  // check if the snake hits the wall or itself
  if (newHead.x === 0 || newHead.x === 19 || newHead.y === 0 || newHead.y === 19) {
    clearInterval(gameInterval);
    alert(`Game Over! Your score is ${score}.`);
  } else if (snake.find(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    clearInterval(gameInterval);
    alert(`Game Over! Your score is ${score}.`);
  } else {
    // add the new head pixel to the game container and the snake array
    createPixel(newHead.x, newHead.y, "snakeBodyPixel");
    snake.push(newHead);
    // check if the snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
      // create a new food pixel
      food = {
        x: Math.floor(Math.random() * 18) + 1,
        y: Math.floor(Math.random() * 18) + 1,
      };
      createPixel(food.x, food.y, "food");
      // increase the score and update the score board
      score += 10;
      document.getElementById("score").innerText = score;
      }
}

// start the game loop
let gameInterval = setInterval(move, 100);

// change the direction of the snake when a key is pressed
document.addEventListener("keydown", event => {
if (event.key === "ArrowUp" && direction !== "down") {
direction = "up";
} else if (event.key === "ArrowDown" && direction !== "up") {
direction = "down";
} else if (event.key === "ArrowLeft" && direction !== "right") {
direction = "left";
} else if (event.key === "ArrowRight" && direction !== "left") {
direction = "right";
}
});

// create the score board
const scoreBoard = document.createElement("div");
scoreBoard.className = "scoreBoard";
scoreBoard.innerHTML = "Score: <span id='score'>0</span>";
gameContainer.appendChild(scoreBoard);