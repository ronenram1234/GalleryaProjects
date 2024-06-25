"use strict";

let board = [];
let player = "w";
let computer = "b";
let options = [];
let lineEnd = 0;
let colEnd = 0;
let recursionLevel = 1;

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

function flipLineToNewColor(lineStart, colStart, color) {
  /* once colors are flank bu last move - chang all colors to colors in head and tail*/
  //

  for (let i = 0; i < options.length; i++) {
    if (options[i][0] == lineStart && options[i][1] == colStart) {
      let lineDirection = options[i][4];
      let colDirection = options[i][5];
      let l = lineStart;
      let c = colStart;
      let lineEnd = options[i][2];
      let colEnd = options[i][3];

      while (c != colEnd || l != lineEnd) {
        positionNewPiece(l, c, player);
        board[l][c] = color;
        l += lineDirection;
        c += colDirection;
      }
    }
  }
}

function cleanBoardOptions() {
  /* clean screen board  and clean also board array from all optuional*/

  for (let line = 0; line < 8; line++)
    for (let col = 0; col < 8; col++)
      if (board[line][col] == "wo" || board[line][col] == "bo") {
        board[line][col] = "e";
        removePiece(line, col);
      }

  while (options.length > 0) {
    options.pop();
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

  //

  let clickedElement;
  if (event.target.classList[0] == "stoneOptional") {
    clickedElement = event.target.parentNode.parentNode;
  } else {
    clickedElement = event.target;
  }
  const parentTd = clickedElement.parentNode;

  let col = Number(clickedElement.classList[1].slice(-1)) - 1;
  let line = Number(parentTd.id.slice(-1)) - 1;
  //
  if (board[line][col] == "wo" || board[line][col] == "bo") {
    positionNewPiece(line, col, player);
    board[line][col] = player;
    flipLineToNewColor(line, col, player);
    cleanBoardOptions();
    // console.log(board, options);

    computerNextMove();
    // findPotentialNextPosition()
  }

  //
}

function mouseOver() {
  /* change over cell opicity*/
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
    //

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
  // if (color=='b') console.log('--------------------checkOtherDirectionForPlayer---------------');
  let stat = false;
  let sentenceL = "";
  let sentenceC = "";
  let sentence = "";
  let c = col + colDirection;
  let l = line + lineDirection;

  //
  //
  //
  // if (color=='b')  console.log(color,line,col,lineDirection,colDirection,l,c);
  while (l > 0 && l < 8 && c > 0 && c < 8) {
    if (arr[l][c] === color) {
      stat = true;
      lineEnd = l;
      colEnd = c;

      // if (color=='b')  console.log(color,line,col,lineDirection,colDirection,l,c)

      break;
    }
    l += lineDirection;
    c += colDirection;
  }
  //
  //
  return stat;
}

function getLoactions(line, col, curBoard, player, openentColor) {
  /* 
    check 8 direction near any oponent piece on he board - creat areas of potential nect mov 

   The piece must be laid adjacent to an opponent’s piece so that the opponent’s piece or a row of opponent’s pieces is flanked by the new piece and another piece of the player’s color.*/

  let optionsL = [];
  // console.log('getLoactions');
  // console.log(optionsL);

  // checkUp - not 0 line && empty spot up && player piece somewhere down
  if (
    line > 0 &&
    curBoard[line - 1][col] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, +1, 0)
  )
    optionsL.push([line - 1, col, lineEnd, colEnd, +1, 0]);

  // checkdown
  if (
    line < 7 &&
    curBoard[line + 1][col] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, -1, 0)
  )
    optionsL.push([line + 1, col, lineEnd, colEnd, -1, 0]);

  // checkRight
  if (
    col < 7 &&
    curBoard[line][col + 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, 0, -1)
  )
    optionsL.push([line, col + 1, lineEnd, colEnd, 0, -1]);

  // checkUp
  if (
    col > 0 &&
    curBoard[line][col - 1] == "e" &&
    checkOtherDirectionForPlayer(player, curBoard, line, col, 0, +1)
  )
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

  // console.log(optionsL);

  return optionsL;
}

function findPotentialNextPosition(
  playerColor,
  openentColor,
  curBoard,
  noShow
) {
  // find all potential positions
  let arr = curBoard;
  let optionsL = [];
  let test = board;
  let allPlayerLocations = [];
  // console.log("findPotentialNextPosition");
  // console.log(playerColor, openentColor);

  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++)
      if (arr[line][col] == openentColor) {
        allPlayerLocations.push([line, col]);
      }
  }

  //
  // console.log(options);
  for (let i = 0; i < allPlayerLocations.length; i++) {
    // console.log('allplayer loop',allPlayerLocations[i],i);
    optionsL.push(
      ...getLoactions(
        ...allPlayerLocations[i],
        curBoard,
        playerColor,
        openentColor
      )
    );
    // console.log(options);
  }
  if (!noShow) {
    for (let x = 0; x < optionsL.length; x++) {
      arr[optionsL[x][0]][optionsL[x][1]] = `${playerColor}o`;
      positionNewPiece(optionsL[x][0], optionsL[x][1], "Optional");
    }
  }

  return optionsL;
}

function initGame() {
  board = initBoard();
  options = findPotentialNextPosition(player, computer, board, false);
  // console.log(options);
  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++) {
      if (board[line][col] == "wo" || board[line][col] == "bo") {
        positionNewPiece(line, col, "Optional");
      }
    }
  }
}

/*-------------- Cumputer Move Execuation ---------------*/

function flipLineToNewColorOnlyBoard(
  l,
  c,
  lineEnd,
  colEnd,
  lineDirection,
  colDirection,
  Board,
  color
) {
  var LocalBoard = JSON.parse(JSON.stringify(Board));

  console.log("input", l, c, lineEnd, colEnd, lineDirection, colDirection);
  while (c != colEnd || l != lineEnd) {
    // positionNewPiece(l, c, player);
    LocalBoard[l][c] = color;
    l += lineDirection;
    c += colDirection;
  }
  // return LocalBoard
}

function playerMove(option, tempBoard, level, color) {
  var localBoard = JSON.parse(JSON.stringify(tempBoard));
  let gradePlayer=0

  localBoard[option[0]][option[1]] = color;
  localBoard = flipLineToNewColorOnlyBoard(...option, localBoard, color);
  // console.log('playerMove',option,tempBoard,level);
  calculateBestOption(level - 1, tempBoard);
  return gradePlayer
}

function computerMove(option, tempBoard, level, color) {
  var localBoard = JSON.parse(JSON.stringify(tempBoard));
  let gradeComp = 0;

  // tempBoard[option[0]][option[1]] = color;
  console.log("option - ", option);

  flipLineToNewColorOnlyBoard(...option, localBoard, color);

  let cLocalOptions = findPotentialNextPosition(
    player,
    computer,
    localBoard,
    true
  );
  for (let i = 0; i < localOptions.length; i++) {
    result.push(
      computerMove(localOptions[i], localBoard, level, computer),
      localOptions[i]
    )};
  return gradeComp;
}

function calculateBestOption(level, Board) {
  let localOptions = [];
  var localBoard = JSON.parse(JSON.stringify(Board));
  let result = [];
  // console.log('calculateBestOption',level,localBoard);
  if (level == 0) console.log("need to be replaced with grading");
  else {
    localOptions = findPotentialNextPosition(
      computer,
      player,
      localBoard,
      true
    );
    for (let i = 0; i < localOptions.length; i++) {
      result.push(
        computerMove(localOptions[i], localBoard, level, computer),
        localOptions[i]
      );
    }
  }

  // console.log(localOptions);
}

function computerNextMove() {
  /* calculateBestOption will return update board with new move in Optional array   */
  // console.log("computer turn");
  calculateBestOption(recursionLevel, board);
}

/*-------------- Start Execuation ---------------*/

initGame();
