// Game Constants & Variables..

let inputDir = {x: 0, y: 0}; //initially direction is 0, 0 on both sides, means our snake is not able to move in any direction .. x: horizontal(columns of grid), y:vertical(rows of grid).
const foodSound = new Audio('/sounds/eating.wav');
const gameOverSound = new Audio('/sounds/gameover.wav');
const moveSound = new Audio('/sounds/move.mp3');
const musicSound = new Audio('/sounds/bg music.mp3');
let speed = 5; // speed of the snake.
let score = 0;
let lastPaintTime = 0; //initially lastpaint time is 0.
let snakeArr = [  //snake array for ading new element after eating food.
    {x: 13, y: 15}
];

food = {x: 6, y: 7};  //food variable. with their initial position row: 7, col:6.



// Game Functions...

//1:-> this is our game loop function and it call itself , means main function again and again... ctime is our current time and lastpaint time :-> last time screen will print ..
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


//2:-> collision function
function isCollide(snake) {
    // If snake bump into itself. if snake x, y bump any element x, y of the snake body then game over. 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If snake bump into the wall.. snake crosses the grid length means  18th or crosses the 0th..
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


//3:-> main game engine function and it have 2 parts:->>>
function gameEngine(){
    // Part 1: Updating the snake array & Food.
    //if snake collides , means game over..
    musicSound.play(); 
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];  //after game over snake goes to its initial position..and start game again..
        score = 0; 
        musicSound.play();
    }

    // If snake  eaten the food, increment the score and regenerate the food..
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        //if score if greater then the hiscore value then update the hi score value..by converting it into JSON string .. the high score value is set and get ny the local storage ..
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;

        //increment the element value after eating the food..
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;

        //given random position to the food on the grid ..
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake by loop..
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Part 2: Display the snake and Food.
    // Display the snake.
    board.innerHTML = "";

    //call snake arr with for each func. in this func. we have arrow func.
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');// making snakeelement by using create element.
        snakeElement.style.gridRowStart = e.y;//doing css in js. setting the row position to the snake element.
        snakeElement.style.gridColumnStart = e.x;//doing css in js .setting the column position to the snake element.

        if(index === 0){
            snakeElement.classList.add('head');// given the class head to the snake element for snake head..
        }
        else{
            snakeElement.classList.add('snake');//given the class snake to the snake element ..for further element of the array after eating the food and these element are attach with the head of the snake element.. 
        }
        board.appendChild(snakeElement);//to show the snake element on the board..
    });


    // Display the food
    foodElement = document.createElement('div');//creating food element for the food of the snake ..
    foodElement.style.gridRowStart = food.y;//css in js. setting the row position of snake food element. 
    foodElement.style.gridColumnStart = food.x;//setting the column position of the snake food element.
    foodElement.classList.add('food')//given the class food to the snake food element for snake food.
    board.appendChild(foodElement);//to show the snake food element on the board..


}



// Main logic starts here..

musicSound.play();
//for set and get the high score from the local storage..
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){ // null means  high score value is 0.
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


//requestAnimationFrame is used for program repetition..we also doing this by set time interval function also..
window.requestAnimationFrame(main);

//if user press any key on keyboard then run this e arrow function..
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game..
    moveSound.play();
    //which key is press that is identify by the switch case statement .
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;//press up then col. is 0, means no change on the column side..
            inputDir.y = -1;//press up then row is decreased by 1..
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});




