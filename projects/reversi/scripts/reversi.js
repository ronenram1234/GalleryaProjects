"use strict";

// function positionNewPiece(col, row, color) {
//   console.log(col, row, color);
//   console.log(`.inLine${row}`);
//   let rowP = document.querySelectorAll(`.inLine${row}`);
//   console.log(rowP);
// }

// positionNewPiece(2, 3, "white");

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
  let c = 0;
  let l = 0;
  console.log('-----------');
  console.log(line, col);

  if (lineDirection == -1) {
    sentenceL = ` for (l=${line};l>=0;l--) `;
  } else if (lineDirection == 1) {
    sentenceL = ` for (l=${line};l<8;l++) `;
  } else sentenceL = ` l=${line}; `;

  if (colDirection == -1) {
    sentenceC = ` for ( c=${col};c>=0;c--) `;
  } else if (colDirection == 1) {
    sentenceC = ` for ( c=${col};c<8;c++) `;
  } else sentenceC = ` c=${col}; `;

  // sentence=sentenceL +' { '+sentenceC + `console.log(arr[l][c],l,c)};`
  sentence =
    sentenceL + " { " + sentenceC + ` if (arr[l][c]==color) stat=true };`;
  console.log(sentence);
  eval(sentence);

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
    options.push([line -1, col]);

  // checkdown
  if (
  line < 7 &&
    curBoard[line + 1][col] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, 0)
  )
    options.push([line +1, col]);


  // checkRight
  if (
    col < 7 &&
      curBoard[line][col+1] == "e" &&
      checkOtherDirectionForPlayer(player, curBoard, line, col, 0, -1)
    )
      options.push([line, col+1]);

  // checkUp
  if (
    col >0 &&
      curBoard[line][col-1] == "e" &&
      checkOtherDirectionForPlayer(player, curBoard, line, col, 0, +1)
    )
      options.push([line, col-1]);
  // checkDiagonalRightUp;
  console.log(line,col,openentColor, line + 1,col-1,curBoard[line + 1][col-1]);
  console.log(curBoard);
  if (
    line > 0 && col < 7 &&
    curBoard[line - 1][col+1] == "e" &&
    curBoard[line + 1][col-1] == player &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, -1)
  )
    options.push([line -1, col]);
  // checkDiagonalRightDown;
  // checkDiagonalLefttUp;
  // checkDiagonalLeftDown;

  // console.log(line,col,options);
  // console.log('---------------------------------');
  return options;
}

function findPotentialNextPosition(playerColor, openentColor, curBoard) {
  // find all potential positions
  let arr = curBoard;
  let allPlayerLocations = [];
  let options=[]
  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++)
      if (arr[line][col] == openentColor) allPlayerLocations.push([line, col]);
  }
  // console.log(allPlayerLocations, playerColor, openentColor);

  for (let i = 0; i < allPlayerLocations.length; i++) {
    options.push(...getLoactions(...allPlayerLocations[i], curBoard, playerColor, openentColor))
      
  }
  for (let x=0; x<options.length;x++)
    // console.log(options[x][0],options[x][1]);
    arr[options[x][0]][options[x][1]]=`${playerColor}o`
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
