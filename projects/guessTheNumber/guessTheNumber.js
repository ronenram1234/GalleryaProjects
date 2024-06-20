"use strict";

const inputGuess = document.querySelector("#inputGuess");
const answers = document.querySelector(".answers");
const maxNumber = 10;
const minNumber = 1;
let computerNum = 0;
let messageUser = "";
let flagGameWon = false;
let count = 0;
const maxSteps = 5;

function userGuess() {
  let guess = 0;
  //   Verify input
  if (flagGameWon) {
    alert("Please reset game - Push 'Start again'");
    return;
  }
  if (count == 5) {
    alert("Exceed 5 tries\n Please reset game - Push 'Start again'");
    return;
  }

  if (!inputGuess.value) {
    alert("Please enter a number 1 to 10");
    return;
  } else {
    guess = Number(inputGuess.value);
    let message =
      guess > maxNumber
        ? "Too big.\n Please enter a number 1 to 10"
        : guess < minNumber
        ? "Too small.\n Please enter a number 1 to 10"
        : "";
    if (message != "") {
      alert(message);
      return;
    }
  }
  count++;

  //   process input
  //   console.log(count);

  switch (true) {
    case guess == computerNum:
      messageUser = `<p style="color: gold;background-color: gray">Exactly! You won the game, the numver is  ${guess}</p>`;
      flagGameWon = true;
      break;
    case guess > computerNum:
      messageUser = `<p style="color: green;">${guess} is too big!!</p>`;
      break;
    case guess < computerNum:
      messageUser = `<p style="color:red;">${guess} is too small!!</p>`;
      break;
    default:
      alert("Error");
      return;
  }
  answers.innerHTML += messageUser;
}

function randomNum() {
  computerNum = Math.ceil(Math.random(10) * 10);
  console.log(computerNum);
}

function startAgain() {
  randomNum();
  answers.innerHTML = "";
  flagGameWon = false;
  count = 0;
}

randomNum();
