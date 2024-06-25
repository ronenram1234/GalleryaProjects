"use strict";

let board = [];
let player = "w";
let computer = "b";
let options = [];
let lineEnd = 0;
let colEnd = 0;

function positionNewPiece(row, col, color) {
  // translate array value to screen
  col++;
  row++;
  let cColor = color;
  let textS = "";
  if (cColor == "w") cColor = "White";
  if (cColor == "b") cColor = "Black";
  if (cColor == "White" || cColor == "Black") {
    textS = ` <div class="centerCircle">
                <div class="stone${cColor}"></div>
              </div>`;
  }
  if (color == "Optional") {
    textS = ` <div class="centerCircle">
                <div class="stoneOptional"></div>
              </div>`;
  }

  let rowP = document.querySelector(`#row${row}`);
  rowP.children[col - 1].innerHTML = textS;
}

function removePiece(row, col) {
  /*following function remove the optional mark for next move from the board*/

  // translate array value to screen
  col++;
  row++;
  let textS = ` <div class="centerCircle">
              
            </div>`;

  let rowP = document.querySelector(`#row${row}`);
  rowP.children[col - 1].innerHTML = textS;
}

function flipLineToNewColor(lineStart, colStart) {
  /* once colors are flank bu last move - chang all colors to colors in head and tail*/
  // console.log(options.length);
  console.log("flip to new color");
  for (let i = 0; i < options.length; i++) {
    if (options[i][0] == lineStart && options[i][1] == colStart) {
      console.log(lineStart, colStart);
      console.log(options[i]);

      let lineDirection = options[i][4];
      let colDirection = options[i][5];
      let l = lineStart;
      let c = colStart;
      let lineEnd = options[i][2];
      let colEnd = options[i][3];

      // console.log(lineDirection, colDirection, l, c, lineEnd, colEnd);
      // console.log("before the while");
      // console.log(c != colEnd);
      // console.log(l != lineEnd);
      // console.log(l != lineEnd || c != colEnd);
      while (c != colEnd || l != lineEnd) {
        // console.log("in the while");
        // console.log(lineDirection, colDirection, l, c, lineEnd, colEnd);
        positionNewPiece(l, c, player);
        l += lineDirection;
        c += colDirection;
      }
    }
  }
}

function cleanBoardOptions() {
  /* clean screen board  and clean also board array from all optuional*/
  console.log("----------");
  console.log(options);
  for (let line = 0; line < 8; line++)
    for (let col = 0; col < 8; col++)
      if (board[line][col] == "wo" || board[line][col] == "bo") {
        board[line][col] = "e";
        removePiece(line, col);
      }
}

function clickedCell(event) {
  /* accept user selection
         check if selection is valid
          mark selectio in screen and array board
          flip all line in scrren and arrat to new color
          activate options places cleanup procedure
          call computer move fuction
          present options on screen - findPotentialNextPosition /
          */

  // console.log(event);

  let clickedElement;
  if (event.target.classList[0] == "stoneOptional") {
    clickedElement = event.target.parentNode.parentNode;
  } else {
    clickedElement = event.target;
  }
  const parentTd = clickedElement.parentNode;

  // console.log(clickedElement);
  // console.log(clickedElement.classList[0]);
  // console.log(clickedElement.classList[1].slice(-1));
  // console.log(parentTd.id.slice(-1));

  let col = Number(clickedElement.classList[1].slice(-1)) - 1;
  let line = Number(parentTd.id.slice(-1)) - 1;
  // console.log(line, col);
  if (board[line][col] == "wo" || board[line][col] == "bo") {
    positionNewPiece(line, col, player);
    board[line][col] = player;
    flipLineToNewColor(line, col);
    cleanBoardOptions();
    // computerNextMove()
    // findPotentialNextPosition()
  }

  // console.log(clickedElement,parentTd);
}

function mouseOver() {
  /* change over cell opicity*/

  console.log("mouseOver");
}

function initBoard() {
  /* init game*/

  let arr = [];
  let oneLine = [];
  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++) oneLine.push("e");
    arr.push(oneLine);

    oneLine = [];
  }
  arr[3][3] = "w";
  arr[3][4] = "b";
  arr[4][3] = "b";
  arr[4][4] = "w";
  positionNewPiece(3, 3, "White");
  positionNewPiece(3, 4, "Black");
  positionNewPiece(4, 3, "Black");
  positionNewPiece(4, 4, "White");
  // positionNewPiece(1, 1, "Optional");

  // positionNewPiece(0, 0, "White");
  // removePiece(0, 0);
  const cells = document.querySelectorAll(".cellR");

  for (let i = 0; i < cells.length; i++) {
    // console.log(i, cells[i]);

    cells[i].addEventListener("click", clickedCell);

    cells[i].addEventListener("mouseover", mouseOver);
  }

  return arr;
}

function checkOtherDirectionForPlayer(
  color,
  arr,
  line,
  col,
  lineDirection,
  colDirection
) {
  /* check  speciic direction specific  oponent piece on he board - report sucess if the selected direction can bo used as future move */

  let stat = false;
  let sentenceL = "";
  let sentenceC = "";
  let sentence = "";
  let c = col + colDirection;
  let l = line + lineDirection;

  // console.log(line, col, lineDirection, colDirection, color);
  // console.log(l, c);
  // console.log("-----------------");
  while (l > 0 && l < 8 && c > 0 && c < 8) {
    if (arr[l][c] === color) {
      stat = true;
      lineEnd = l;
      colEnd = c;
      // console.log('+++++++++++++++++++');
      // console.log(l,c);
      // console.log('***************');
      // console.log(lineEnd, colEnd);
      // console.log('+++++++++++++++++++');
      // console.log("---->", l, c);
      break;
    }
    l += lineDirection;
    c += colDirection;
  }
  // console.log("+++++++++++++++");
  // console.log(stat);
  return stat;
}

function getLoactions(line, col, curBoard, player, openentColor) {
  /* 
    check 8 direction near any oponent piece on he board - creat areas of potential nect mov 

   The piece must be laid adjacent to an opponent’s piece so that the opponent’s piece or a row of opponent’s pieces is flanked by the new piece and another piece of the player’s color.*/

  let optionsL = [];

  // checkUp - not 0 line && empty spot up && player piece somewhere down
  if (
    line > 0 &&
    curBoard[line - 1][col] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, 0)
  )
    // console.log('------------');
    // console.log(lineEnd,colEnd);
    optionsL.push([line - 1, col, lineEnd, colEnd, +1, 0]);

  // checkdown
  if (
    line < 7 &&
    curBoard[line + 1][col] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, 0)
  )
    // console.log('------------');
    // console.log(lineEnd,colEnd);
    optionsL.push([line + 1, col, lineEnd, colEnd, -1, 0]);

  // checkRight
  if (
    col < 7 &&
    curBoard[line][col + 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, 0, -1)
  )
    // console.log('------------');
    // console.log(lineEnd,colEnd);
    optionsL.push([line, col + 1, lineEnd, colEnd, 0, -1]);

  // checkUp
  if (
    col > 0 &&
    curBoard[line][col - 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, 0, +1)
  )
    // console.log('------------');
    // console.log(lineEnd,colEnd);
    optionsL.push([line, col - 1, lineEnd, colEnd, 0, +1]);

  // checkDiagonalRightUp;
  if (
    line > 0 &&
    col < 7 &&
    curBoard[line - 1][col + 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, -1)
  )
    optionsL.push([line - 1, col + 1, lineEnd, colEnd, +1, -1]);

  // checkDiagonalRightDown;
  if (
    line < 7 &&
    col < 7 &&
    curBoard[line + 1][col + 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, -1)
  )
    optionsL.push([line + 1, col + 1, lineEnd, colEnd, -1, -1]);

  // checkDiagonalLefttUp;
  if (
    line > 0 &&
    col > 0 &&
    curBoard[line - 1][col - 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, +1)
  )
    optionsL.push([line - 1, col - 1, lineEnd, colEnd, +1, +1]);

  // checkDiagonalLeftDown;
  if (
    line < 7 &&
    col > 0 &&
    curBoard[line + 1][col - 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, +1)
  )
    optionsL.push([line + 1, col - 1, lineEnd, colEnd, -1, +1]);

  return optionsL;
}

function findPotentialNextPosition(playerColor, openentColor, curBoard) {
  // find all potential positions
  let arr = curBoard;
  let allPlayerLocations = [];

  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++)
      if (arr[line][col] == openentColor) allPlayerLocations.push([line, col]);
  }
  // console.log(allPlayerLocations, playerColor, openentColor);

  for (let i = 0; i < allPlayerLocations.length; i++) {
    options.push(
      ...getLoactions(
        ...allPlayerLocations[i],
        curBoard,
        playerColor,
        openentColor
      )
    );
  }

  for (let x = 0; x < options.length; x++) {
    arr[options[x][0]][options[x][1]] = `${playerColor}o`;
    positionNewPiece(options[x][0], options[x][1], "Optional");
  }

  return arr;
}

board = initBoard();
// console.log(board);

// for (let line = 0; line < 8; line++) {
//   for (let col = 0; col < 8; col++) {
//     if (board[line][col] == "wo" || board[line][col] == "bo") {
//       positionNewPiece(line, col, "Optional");
//     }
//   }
// }

findPotentialNextPosition(player, computer, board);

for (let line = 0; line < 8; line++) {
  for (let col = 0; col < 8; col++) {
    if (board[line][col] == "wo" || board[line][col] == "bo") {
      positionNewPiece(line, col, "Optional");
    }
  }
}

console.log(board);
// console.log(findPotentialNextPosition(computer, player, board));
