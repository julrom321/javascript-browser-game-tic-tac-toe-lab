/*-------------------------------- Constants --------------------------------*/
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
/*---------------------------- Variables (state) ----------------------------*/
let winner = null;
// let loser = null;
let tie = null;
let turn = null;
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
/*------------------------ Cached Element References ------------------------*/
const sqrs = document.querySelectorAll(".sqr");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
/*-------------------------------- Functions --------------------------------*/
initializeGame();
function initializeGame(){
    sqrs.forEach(sqr => sqr.addEventListener("click", sqrClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}
function sqrClicked(){
    const sqrIndex = this.getAttribute("sqrIndex"); // "this" is refering to the squares clicked
    if(options[sqrIndex] != "" || !running){ // "!running" if the game is not running
        return;}
    updateSqr(this, sqrIndex);
    checkWinner();
}
function updateSqr(sqr, index){
    options[index] = currentPlayer;
    sqr.textContent = currentPlayer;
}
function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"; // "?" is a ternary operator. pretty much it's a faster way of writing an else statement but has conditions
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const sqrA = options[condition[0]];
        const sqrB = options[condition[1]];
        const sqrC = options[condition[2]];
        if(sqrA == "" || sqrB == "" || sqrC == "")
            {continue;}
        if(sqrA == sqrB && sqrB == sqrC){
            roundWon = true;
            break;
        }}
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = "draw";
        running = false;
    }
    else{changePlayer();}
}
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    sqrs.forEach(sqr => sqr.textContent = "");
    running = true;
}

/*----------------------------- Event Listeners -----------------------------*/
