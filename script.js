const boxs = document.querySelectorAll(".box");
const players = document.getElementById("players");
const restartBtn = document.querySelector(".btn");
const heading = document.getElementById("heading");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let music = new Audio("music.mp3")
//making variables

let currentPlayer = "X";
let nextPlayer = "0";
let playerTurn = currentPlayer;

//function to change player's turn

const startGame = () => {
  boxs.forEach((box) => {
    box.addEventListener("click", handleClick);
  });
};

const  handleClick=(e)=>{
  if (e.target.textContent === "") {
    players.innerText = `player-${playerTurn}`;
    audioTurn.play();
    e.target.textContent = playerTurn;
     if(checkWin()===true){
      // console.log(`${playerTurn} win`);
       heading.textContent=`Player-${playerTurn} has win.`
       music.play();
       disableGame();
     }
    else if(checkTie()){
      console.log("tie");
      gameover.play();
      heading.textContent=`Its a tie.`
      disableGame();
     
    }
    else{
    changeTurn();
    }
  }
};


const changeTurn = () => {
  if (playerTurn === currentPlayer) {
    playerTurn = nextPlayer;
  } else {
    playerTurn = currentPlayer;
  }
};

const checkWin = () => {
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

  for (let i = 0; i < winConditions.length; i++) {
    const [pos1, pos2, pos3] = winConditions[i];
    // console.log(`${pos1} ${pos2} ${pos3}`);
    if (
      boxs[pos1].textContent !== "" &&
      boxs[pos1].textContent === boxs[pos2].textContent &&
      boxs[pos2].textContent === boxs[pos3].textContent
    ) {
      return true;
    }
  }
  return false;
};

const checkTie = () => {
  let emptyBoxs = 0;
  boxs.forEach((box) => {
    if (box.textContent === "") {
      emptyBoxs += 1;
    }
  });
  if (emptyBoxs === 0 && !checkWin()) {
    return true;
  }
  return false;
};

startGame();


//restart button
restartBtn.addEventListener('click',()=>{
  // console.log("clicked");
  boxs.forEach((box)=>{
    box.textContent='';
    box.classList.remove('disable');
  })
  heading.textContent=`Let's play Tic Tac Toe`;
  music.pause();
  startGame();
})

//disable game

const disableGame=()=>{
   boxs.forEach((box)=>{
    box.removeEventListener('click',handleClick);
    box.classList.add('disable');
   })
}