"use strict";

function positionNewPiece(row, col, color) {
  // translate array value to screen
  col++;
  row++;
  let textS = "";
  if (color == "White" || color == "Black") {
    textS = ` <div class="centerCircle">
                <div class="stone${color}"></div>
              </div>`;
  }
  if (color == "Optional") {
    textS = ` <div class="centerCircle">
                <div class="stoneOptional"></div>
              </div>`;
              console.log('-------');
  }
  

  let rowP = document.querySelector(`#row${row}`);
  rowP.children[col - 1].innerHTML = textS;
  // console.log(rowP);
}

function removePiece(row, col) {
  // translate array value to screen

  col++;
  row++;

  let textS = ` <div class="centerCircle">
              
            </div>`;

  let rowP = document.querySelector(`#row${row}`);
  rowP.children[col - 1].innerHTML = textS;
}

function initBoard() {
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
  positionNewPiece(1, 1, "Optional");

  // positionNewPiece(0, 0, "White");
  // removePiece(0, 0);

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
  /* check on posistion if it is valid for next move, valid position

   The piece must be laid adjacent to an opponent’s piece so that the opponent’s piece or a row of opponent’s pieces is flanked by the new piece and another piece of the player’s color.*/

  let options = [];

  // checkUp - not 0 line && empty spot up && player piece somewhere down
  if (
    line > 0 &&
    curBoard[line - 1][col] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, 0)
  )
    options.push([line - 1, col]);

  // checkdown
  if (
    line < 7 &&
    curBoard[line + 1][col] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, 0)
  )
    options.push([line + 1, col]);

  // checkRight
  if (
    col < 7 &&
    curBoard[line][col + 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, 0, -1)
  )
    options.push([line, col + 1]);

  // checkUp
  if (
    col > 0 &&
    curBoard[line][col - 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, 0, +1)
  )
    options.push([line, col - 1]);

  // checkDiagonalRightUp;
  if (
    line > 0 &&
    col < 7 &&
    curBoard[line - 1][col + 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, -1)
  )
    options.push([line - 1, col + 1]);

  // checkDiagonalRightDown;
  if (
    line < 7 &&
    col < 7 &&
    curBoard[line + 1][col + 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, -1)
  )
    options.push([line + 1, col + 1]);

  // checkDiagonalLefttUp;
  if (
    line > 0 &&
    col > 0 &&
    curBoard[line - 1][col - 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, +1)
  )
    options.push([line - 1, col - 1]);

  // checkDiagonalLeftDown;
  if (
    line < 7 &&
    col > 0 &&
    curBoard[line + 1][col - 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, +1)
  )
    options.push([line + 1, col - 1]);

  return options;
}

function findPotentialNextPosition(playerColor, openentColor, curBoard) {
  // find all potential positions
  let arr = curBoard;
  let allPlayerLocations = [];
  let options = [];
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
  for (let x = 0; x < options.length; x++)
    // console.log(options[x][0],options[x][1]);
    arr[options[x][0]][options[x][1]] = `${playerColor}o`;
  // console.log(options);
  return arr;
}

let board = [];
let player = "w";
let computer = "b";
board = initBoard();
// console.log(board);

findPotentialNextPosition(player, computer, board);
console.log(board);
// console.log(findPotentialNextPosition(computer, player, board));
