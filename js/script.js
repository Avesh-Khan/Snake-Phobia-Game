// constance & variables 
let inputDirection = { x: 0, y: 0 }
// let board = document.getElementById('board');
const foodSound = new Audio('../music/food.mp3');
const GameoverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let lastPaintTime = 0;
let speed = 9;
let snakeArr = [
    { x: 14, y: 15 }
];
let food = { x: 5, y: 6 };
let score = 0;



// Game function

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;

    gameEngine();
}

function isCollide(snake) {
    // if you bumb into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if your bumb into wall 
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}
function gameEngine() {
    // part 1 : updating the snake array and food 

    if (isCollide(snakeArr)) {
        GameoverSound.play();
        musicSound.pause();
        inputDirection = { x: 0, y: 0 };
        alert('Game Over... Press Enter key to restart');
        snakeArr = [{ x: 14, y: 15 }];
        score = 0;
        musicSound.play();
       
    }

    //   If you have eaten the food, increament the score and regenrate the food 

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = `Score: ` + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;

    // part 2 : Display the snake and food 

    // Display the Snake
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    // Display the Food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



// main logic starts here...
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDirection = { x: 0, y: 1 };
    moveSound.play();

    switch (e.key) {
        case 'ArrowUp':
            console.log('arrowUp');
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case 'ArrowDown':
            console.log('arrowDown');
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case 'ArrowLeft':
            console.log('arrowLeft');
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case 'ArrowRight':
            console.log('arrowRight');
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default:
            break;
    }
})

