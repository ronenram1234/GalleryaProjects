"use strict";

let board = [];
let savedBoard = [];
let player = "w";
let computer = "b";
function optionsLine(line, col, lineEnd, colEnd, directionLine, directionCol) {
  this.line = line;
  this.col = col;
  this.lineEnd = lineEnd;
  this.colEnd = colEnd;
  this.directionLine = directionLine;
  this.directionCol = directionCol;
}

let options = [];
let lineEnd = 0;
let colEnd = 0;
let recursionLevel = 3;
let debugFlag = true;

function positionNewPiece() {
  // translate boarday value to screen
  let cColor;
  let textS;
  let temp;
  let rowP;

  board.map((line, y) =>
    line.map((col, x) => {
      if (board[y][x] != savedBoard[y][x]) {
        // console.log(y, col, x);
        // console.log(board[y][x]);
        savedBoard[y][x] = board[y][x];

        cColor = board[y][x];
        console.log(y, x, cColor);

        textS = "";
        if (cColor == "w") temp = "White";
        if (cColor == "b") temp = "Black";
        if (cColor == "wo") temp = "Optional";
        textS = ` <div class="centerCircle">
        <div class="stone${temp}"></div>
      </div>`;
        console.log(cColor, temp);
        console.log(textS);
        rowP = document.querySelector(`#row${y}`);
        rowP.children[x].innerHTML = textS;
      }
    })
  );
}

function removePiece(row, col) {
  /*following function remove the optional mark for next move from the board*/

  // translate boarday value to screen
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
        board[l][c] = color;
        l += lineDirection;
        c += colDirection;
      }
    }
  }
  // positionNewPiece(1, 1, "d");
  // clean other portential moves in board
  board.map((line, y) =>
    line.map((cell, x) => {
      if (cell == "wo" || cell == "bo") {
        console.log(y, x);
        board[y][x] = "e";
      }
    })
  );
  options = [];
}

function clickedCell(event) {
  /* accept user selection
         check if selection is valid
          mark selectio in screen and boarday board
          flip all line in scrren and boardat to new color
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

  let col = Number(clickedElement.classList[1].slice(-1));
  let line = Number(parentTd.id.slice(-1));
  //
  if (board[line][col] == "wo" || board[line][col] == "bo") {
    board[line][col] = player;
    flipLineToNewColor(line, col, player);
    // cleanBoardOptions();
    positionNewPiece();

    //(board, options);

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

  board = [];
  let oneLine = [];
  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++) oneLine.push("e");
    board.push(oneLine);

    oneLine = [];
  }

  savedBoard = JSON.parse(JSON.stringify(board));
  board[3][3] = "w";
  board[3][4] = "b";
  board[4][3] = "b";
  board[4][4] = "w";
  positionNewPiece();

  const cells = document.querySelectorAll(".cellR");

  for (let i = 0; i < cells.length; i++) {
    //

    cells[i].addEventListener("click", clickedCell);

    cells[i].addEventListener("mouseover", mouseOver);
  }
}

function checkOtherDirectionForPlayer(
  color,
  board,
  line,
  col,
  lineDirection,
  colDirection
) {
  /* check  speciic direction specific  oponent piece on he board - report sucess if the selected direction can bo used as future move */
  // if (color=='b') //('--------------------checkOtherDirectionForPlayer---------------');
  let stat = false;
  let sentenceL = "";
  let sentenceC = "";
  let sentence = "";
  let c = col + colDirection;
  let l = line + lineDirection;

  //
  //
  //
  // if (color=='b')  //(color,line,col,lineDirection,colDirection,l,c);
  while (l > 0 && l < 8 && c > 0 && c < 8) {
    if (board[l][c] === color) {
      stat = true;
      lineEnd = l;
      colEnd = c;

      // if (color=='b')  //(color,line,col,lineDirection,colDirection,l,c)

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
  // //('getLoactions');
  // //(optionsL);

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

  // //(optionsL);

  return optionsL;
}

function findPotentialNextPosition(
  playerColor,
  openentColor,
  curBoard,
  noShow
) {
  // find all potential positions
  // let board = curBoard; ---> board is global variable
  options = [];
  // let test = board;
  let allPlayerLocations = [];
  // //("findPotentialNextPosition");
  // //(playerColor, openentColor);

  for (let line = 0; line < 8; line++) {
    for (let col = 0; col < 8; col++)
      if (curBoard[line][col] == openentColor) {
        allPlayerLocations.push([line, col]);
      }
  }

  //
  // //(options);
  for (let i = 0; i < allPlayerLocations.length; i++) {
    // //('allplayer loop',allPlayerLocations[i],i);
    options.push(
      ...getLoactions(
        ...allPlayerLocations[i],
        curBoard,
        playerColor,
        openentColor
      )
    );
    // //(options);
  }

  for (let x = 0; x < options.length; x++) {
    curBoard[options[x][0]][options[x][1]] = `${playerColor}o`;
  }
  // positionNewPiece(1, 1, "Optional");
  return options;
}

function initGame() {
  initBoard(); /*intialiaze board global variable*/

  let options = findPotentialNextPosition(player, computer, board, false);
  positionNewPiece();
  // //(options);
  // for (let line = 0; line < 8; line++) {
  //   for (let col = 0; col < 8; col++) {
  //     if (board[line][col] == "wo" || board[line][col] == "bo") {
  //       positionNewPiece(line, col, "Optional");
  //     }
  //   }
  // }
  // //(calculateBoardValueForComputerMove(player,computer, board));
}

/*-------------- Cumputer Move Execuation ---------------*/
let tableNumber = 1;

function debugDataSave(board, level) {
  if (!debugFlag) return;
  let boardString = "";
  let char = "";
  let lineString = "";
  const location = document.querySelector(".debugDiv");
  location.innerHTML += `<h1> Recursion Level - ${level}<br>  Table Number- ${tableNumber++}</h1><br>`;
  for (let l = 0; l < 8; l++) {
    for (let c = 1; c < 8; c++) {
      switch (board[l][c]) {
        case "b":
          char = "⚫";
          break;
        case "w":
          char = "⚪";
          break;
        default:
          char = String(`${l},${c}`);
          break;
      }
      lineString += "|" + char + "|";
    }
    boardString = "=".repeat(10 - level) + ">" + lineString + "\n";
    location.innerText += "=".repeat(20 - level * 3) + ">" + lineString;
    location.innerHTML += "<br>";
    lineString = "";
  }
  location.innerHTML += "<br>" + "<br>" + "<br>";
  boardString = location.innerText + boardString + "\n";
}

function calculateBoardValueForComputerMove(player, computer, localBoard) {
  const gradeP = localBoard.flat().filter((item) => item === player).length;
  const gradeC = localBoard.flat().filter((item) => item === computer).length;
  return gradeP - gradeC;
}

function calculateOptioTopGrade(result) {
  // let localresult = JSON.parse(JSON.stringify(result));
  let resultLine = [];
  const grade = result.flat().filter((item) => item === computer).length;
  let i = 0;
  while (i < result.length) {
    if (grade === result[i][0]) {
      resultLine.push(result[i]);
      break;
    }
    i++;
  }
  return [grade, resultLine];
}

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
  // let LocalBoard = JSON.parse(JSON.stringify(Board));
  let LocalBoard = Board;

  //("input", l, c, lineEnd, colEnd, lineDirection, colDirection);
  while (c != colEnd || l != lineEnd) {
    // positionNewPiece(l, c, player);
    LocalBoard[l][c] = color;
    l += lineDirection;
    c += colDirection;
  }
  // return LocalBoard
}

function playerMove(option, tempBoard, level, color, openentColor) {
  let localBoard = JSON.parse(JSON.stringify(tempBoard));
  let grade = 0;
  let result = [];

  if (level == 0) return 0; //end recursion

  // tempBoard[option[0]][option[1]] = color;

  if (option.length > 0)
    flipLineToNewColorOnlyBoard(...option, localBoard, openentColor);

  grade = calculateBoardValueForComputerMove(computer, player, localBoard);

  let cLocalOptions = findPotentialNextPosition(
    player,
    computer,
    localBoard,
    true
  );

  for (let i = 0; i < cLocalOptions.length; i++) {
    result.push(
      computerMove(cLocalOptions[i], localBoard, level - 1, computer, player),
      cLocalOptions[i][0],
      cLocalOptions[i][1]
    );
  }
  /*  
  following will find the best next move from teh result boarday
  
  result sructure example
  [5, 2, 4]
  [12,2, 4]
  [value, line, col]
  
  */
  // //("result2 - ", result);
  let nResult = calculateOptioTopGrade(result);
  nResult[0] += grade;

  // //("result1 - ", result);
  debugDataSave(localBoard, level);

  return nResult;
}

function computerMove(option, tempBoard, level, color, openentColor) {
  let localBoard = JSON.parse(JSON.stringify(tempBoard));
  let grade = 0;
  let result = [];

  if (level == 0) return 0; //end recursion
  if (level == 1) {
    console.log("top level");
    console.log(nResult);
  }
  // tempBoard[option[0]][option[1]] = color;
  //(option.length > 0);

  let cLocalOptions = findPotentialNextPosition(
    color,
    openentColor,
    localBoard,
    true
  );

  for (let i = 0; i < cLocalOptions.length; i++) {
    let sendBoard = JSON.parse(JSON.stringify(localBoard));
    for (let n = 0; n < cLocalOptions.length; n++) {
      if (i != n) {
        sendBoard[cLocalOptions[i][0]][cLocalOptions[i][1]] = "e";
      } else {
        sendBoard[cLocalOptions[i][0]][cLocalOptions[i][1]] = color;
      }
    }

    flipLineToNewColorOnlyBoard(...option, sendBoard, openentColor);

    grade = calculateBoardValueForComputerMove(color, openentColor, sendBoard);
    result.push([
      playerMove(cLocalOptions[i], sendBoard, level - 1, player, computer),
      cLocalOptions[i][0],
      cLocalOptions[i][1],
      grade,
    ]);
  }

  /*  
  following will find the best next move from teh result boarday
  
  result sructure example
  [5, 2, 4]
  [12,2, 4]
  [value, line, col]
  
  */
  //("result2 - ", result);
  let nResult = calculateOptioTopGrade(result);
  nResult[0] += grade;
  console.log(nResult);
  if (level == recursionLevel) {
    console.log("top level");
    console.log(nResult);
  }
  //("result1 - ", result);

  debugDataSave(localBoard, level);

  return nResult;
}

function computerNextMove() {
  /* calculateBestOption will return update board with new move in Optional boarday   */
  // //("computer turn");
  // let localBoard = JSON.parse(JSON.stringify(board));
  let result = [];

  const startTime = performance.now();
  debugDataSave(board, recursionLevel);

  result = computerMove([], board, recursionLevel, computer, player);

  const endTime = performance.now();
  console.log(`Call took ${endTime - startTime} milliseconds`);

  //(`Call took ${endTime - startTime} milliseconds`);
  // //("result - ", result);
}

/*-------------- Start Execuation ---------------*/

initGame();
