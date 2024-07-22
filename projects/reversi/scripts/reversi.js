"use strict";

let board = [];
let savedBoard = [];
let player = "w";
let computer = "b";
// function optionsLine(line, col, lineEnd, colEnd, directionLine, directionCol) {
//   this.line = line;
//   this.col = col;
//   this.lineEnd = lineEnd;
//   this.colEnd = colEnd;
//   this.directionLine = directionLine;
//   this.directionCol = directionCol;
// }

let options = [];
// let lineEnd = 0;
// let colEnd = 0;
let recursionLevel = 4;
let debugFlag = false;
let debugPlayerTurn = 0;
let debugFlagDisplay = false;
let debugResultFlag = false;
let recordID = 1;
let debugLogger = [];

function debugRec(
  recursionLevel,
  currentOptionLine,
  currentOption,
  openentColor,
  color,
  grade,
  allOptions,
  board
) {
  (this.recursionLevel = recursionLevel),
    (this.a_currentOptionLine = currentOptionLine),
    (this.b_currentOption = currentOption),
    (this.c_openentColor = openentColor),
    (this.d_color = color),
    (this.e_grade = grade),
    (this.g_allOptions = allOptions),
    (this.h_board = board);
}

function positionNewPiece(board) {
  // translate boarday value to screen
  let cColor;
  let textS;
  let temp;
  let rowP;

  board.map((line, y) =>
    line.map((col, x) => {
      if (board[y][x] != savedBoard[y][x]) {
        savedBoard[y][x] = board[y][x];

        cColor = board[y][x];

        textS = "";
        if (cColor == "w") temp = "White";
        if (cColor == "b") temp = "Black";
        if (cColor == "wo") temp = "Optional";
        textS = ` <div class="centerCircle"><div class="stone${temp}"></div>  </div>`;
        if (cColor == "e")
          textS = ` <div class="centerCircle"> <div ></div> </div>`;

        // console.log(y, x);
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

  // clean other portential moves in board
  board.map((line, y) =>
    line.map((cell, x) => {
      if (cell == "wo" || cell == "bo") {
        // console.log(y, x);
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
  if (debugFlag) {
    debugPlayerTurn++;
    console.log("start clickedCell");
  }

  let clickedElement;
  if (event.target.classList[0] == "stoneOptional") {
    clickedElement = event.target.parentNode.parentNode;
  } else {
    clickedElement = event.target;
  }
  const parentTd = clickedElement.parentNode;

  let col = Number(clickedElement.classList[1].slice(-1));
  let line = Number(parentTd.id.slice(-1));
  // console.log("clickedCell before if");
  if (board[line][col] == "wo" || board[line][col] == "bo") {
    board[line][col] = player;
    // console.log("clickedCell before flipLineToNewColor");
    flipLineToNewColor(line, col, player);
    // console.log("clickedCell before positionNewPiece");
    positionNewPiece(board);
    // console.log("clickedCell before computerNextMove");
confirm('computer start') 
    computerNextMove();
    confirm('computer end')
    // console.log("clickedCell after computerNextMove");
  }
  if (debugFlag) {
    console.log("end clickedCell");
  }
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
  positionNewPiece(board);

  const cells = document.querySelectorAll(".cellR");

  for (let i = 0; i < cells.length; i++) {
    //

    cells[i].addEventListener("click", clickedCell);

    cells[i].addEventListener("mouseover", mouseOver);
  }
}

let countCheckOtherDirectionForPlayer = 0;

function checkOtherDirectionForPlayer(
  color,
  openentColor,
  board,
  line,
  col,
  lineDirection,
  colDirection,
  optionsL
) {
  /* check  speciic direction specific  oponent piece on he board - report sucess if the selected direction can bo used as future move */
  if (debugFlag) {
    console.log("----------start checkOtherDirectionForPlayer");
    console.log(`----------debugPlayerTurn=${debugPlayerTurn}`);
    console.log(
      color,
      openentColor,
      line,
      col,
      lineDirection,
      colDirection
      // optionsL
    );
    countCheckOtherDirectionForPlayer++;
  }
  let l = line + lineDirection;
  let c = col + colDirection;
  let lRevrese = line - lineDirection;
  let cReverse = col - colDirection;

  // if (board[l][c]!=openentColor) return [stat, lineEnd, colEnd];

  if (l < 0 || l > 7 || c < 0 || c > 7) return optionsL;
  if (board[l][c] != "e") return optionsL;
  while (lRevrese >= 0 && lRevrese <= 7 && cReverse >= 0 && cReverse <= 7) {
    // console.log('lRevrese -',lRevrese);
    // console.log('cReverse -',cReverse);
    // check counter direction if color exisit
    if (board[lRevrese][cReverse] == "e") break;
    if (board[lRevrese][cReverse] == color) {
      while (l >= 0 && l <= 7 && c >= 0 && c <= 7) {
        // console.log('l -',l);
        // console.log('c -',c);
        if (board[l][c] == color) return optionsL;
        if (board[l][c] == "e") {
          // stat = true;

          optionsL.push([
            // line + lineDirection,
            // col + colDirection,
            l,
            c,
            lRevrese,
            cReverse,
            lineDirection * -1,
            colDirection * -1,
            -50,
            -50,
          ]);

          return optionsL;
        }
        l += lineDirection;
        c += colDirection;
      }
    } else {
      lRevrese -= lineDirection;
      cReverse -= colDirection;
    }
  }
  //
  //
  // document.querySelector("#player-digit").innerText = board
  //   .flat()
  //   .filter((item) => item === player).length;
  // document.querySelector("#computer-digit").innerText = board
  //   .flat()
  //   .filter((item) => item === computer).length;

  return optionsL;
}

function getLoactions(line, col, curBoard, player, openentColor) {
  /* 
    check 8 direction near any oponent piece on he board - creat areas of potential nect mov 

   The piece must be laid adjacent to an opponent’s piece so that the opponent’s piece or a row of opponent’s pieces is flanked by the new piece and another piece of the player’s color.*/

  let optionsL = [];
  // //('getLoactions');
  // //(optionsL);

  // checkUp - not 0 line && empty spot up && player piece somewhere down
  let stat, lineEnd, colEnd;

  for (let lDirection = -1; lDirection <= +1; lDirection++)
    for (let cDirection = -1; cDirection <= +1; cDirection++) {
      if (debugFlag) {
        console.log("----------start getLoactions");
        console.log(`----------debugPlayerTurn=${debugPlayerTurn}`);

        console.log(
          player,
          openentColor,
          // curBoard,
          line,
          col,
          lDirection,
          cDirection
          // optionsL
        );
      }
      if (!(lDirection == 0 && cDirection == 0)) {
        optionsL = checkOtherDirectionForPlayer(
          player,
          openentColor,
          curBoard,
          line,
          col,
          lDirection,
          cDirection,
          optionsL
        );
      }
    }
  if (debugFlag) {
    console.log("getLoactions after getLoactions");
  }
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
    // //('allplayeclr loop',allPlayerLocations[i],i);

    options.push(
      ...getLoactions(
        ...allPlayerLocations[i],
        curBoard,
        playerColor,
        openentColor
      )
    );
  }

  if (options.length == 0) return [];

  for (let x = 0; x < options.length; x++) {
    curBoard[options[x][0]][options[x][1]] = `${playerColor}o`;
  }
  // positionNewPiece(1, 1, "Optional");
  return options;
}

function initGame() {
  initBoard(); /*intialiaze board global variable*/

  findPotentialNextPosition(player, computer, board, false);
  positionNewPiece(board);
}

/*-------------- Cumputer Move Execuation ---------------*/


function calculateBoardValueForComputerMove(localBoard) {
  let rulesImprovments1 = 0;
let rulesImprovments2 = 1;

for (let i=0;i<8;i++)
  for (let x=0;x<8;x++)
    if (localBoard[i][x]=='b' && (i==7 || i==0 || x==0 || x==7)) {
      rulesImprovments1++
    }
    rulesImprovments2= (localBoard[0][0]==='b') ? 1 : 0 + (localBoard[0][7]==='b') ? 1 : 0 +(localBoard[7][0]==='b') ? 1 : 0 +(localBoard[7][7]==='b') ? 1 : 0
  
// if (rulesImprovments1 > 0) console.log(rulesImprovments1);

  const gradeP = localBoard.flat().filter((item) => item === player).length;
  let gradeC = localBoard.flat().filter((item) => item === computer).length ;
  gradeC= gradeC*(1+rulesImprovments2/4)+rulesImprovments1*2 // add rules grading
  return gradeC - gradeP;
}

function calculateOptioTopGrade(result) {
  result[0].leavesGrade += result[0].currentGrade;
  let maxGrade = result[0].leavesGrade;
  let maxGradeIndex = 0;
  for (let i = 1; i < result.length; i++) {
    result[i].leavesGrade += result[i].currentGrade;
    if (maxGrade < result[i].leavesGrade) {
      maxGrade = result[i].leavesGrade;
      maxGradeIndex = i;
    }
  }

  return result[maxGradeIndex];
}

function flipLineToNewColorOnlyBoard(
  l,
  c,
  lineEnd,
  colEnd,
  lineDirection,
  colDirection,
  flagL,
  flagC,
  color,
  Board
) {
  let LocalBoard = Board;

  while (c != colEnd || l != lineEnd) {
    LocalBoard[l][c] = color;
    l += lineDirection;
    c += colDirection;
  }
}

function decsionTreeLeaf(
  l,
  c,
  lineEnd,
  colEnd,
  lDirection,
  cDirection,
  color,
  leavesGrade = 0,
  currentGrade,
  endGameFlag,
  recordID
) {
  this.l = l;
  this.c = c;
  this.lineEnd = lineEnd;
  this.colEnd = colEnd;
  this.lineDirection = lDirection;
  this.colDirection = cDirection;
  this.color = color;
  this.leavesGrade = leavesGrade;
  this.currentGrade = currentGrade;
  this.endGameFlag = endGameFlag;
  this.recordID = recordID;
}

function move(option, tempBoard, level, color, openentColor) {
  // function computerMove(option, tempBoard, level, color, openentColor) {
  let localBoard = JSON.parse(JSON.stringify(tempBoard));
  let grade = 0;

  if (level == 0) return 0; //end recursion

  let cLocalOptions = findPotentialNextPosition(
    color,
    openentColor,
    localBoard,
    true
  );
  // console.log("move after  cLocalOptions");
  if (cLocalOptions.length == 0) {
    return new decsionTreeLeaf(0, 0, 0, color, 0, true);
  }

  let result = [];

  const tempOptions = [...cLocalOptions];
  const tempOptions2 = [...cLocalOptions];

  for (let i = 0; i < cLocalOptions.length; i++) {
    let sendBoard = JSON.parse(JSON.stringify(localBoard));

    for (let n = 0; n < tempOptions.length; n++) {
      if (i != n) {
        sendBoard[tempOptions[n][0]][tempOptions[n][1]] = "e";
      } else {
        sendBoard[tempOptions[n][0]][tempOptions[n][1]] = color;
      }
    }

    flipLineToNewColorOnlyBoard(...cLocalOptions[i], color, sendBoard);
    if (cLocalOptions[i][6] != -1) {
      for (let x = i + 1; x < cLocalOptions.length; x++) {
        if (
          cLocalOptions[i][0] == cLocalOptions[x][0] &&
          cLocalOptions[i][1] == cLocalOptions[x][1]
        ) {
          flipLineToNewColorOnlyBoard(...cLocalOptions[x], color, sendBoard);
          cLocalOptions[x][6] = -1;
          cLocalOptions[x][7] = i;
        } else {
          flipLineToNewColorOnlyBoard(...cLocalOptions[i], color, sendBoard);
        }
      }
    }

    grade = calculateBoardValueForComputerMove(sendBoard);

    if (debugFlag) {
      debugLogger.push(
        new debugRec(
          level,
          cLocalOptions[i],
          i,
          openentColor,
          color,
          grade,
          cLocalOptions,
          sendBoard
        )
      );
      console.log(
        "".padStart(5 * (i + 1), "----") +
          ` level-${level}, iteration-${i}, grade-${grade}, numberOfIterations-${cLocalOptions.length}`,
        debugLogger
      );
      console.log(debugLogger);
    }

    if (debugFlagDisplay) {
      positionNewPiece(sendBoard);

      console.log(level);
      console.log(cLocalOptions[i]);
    }

    let leavesGrade = move(
      cLocalOptions[i],
      sendBoard,
      level - 1,
      openentColor,
      color
    );
    if (debugFlagDisplay) {
      console.log(leavesGrade);
    }

    result.push(
      new decsionTreeLeaf(
        cLocalOptions[i][0],
        cLocalOptions[i][1],
        cLocalOptions[i][2],
        cLocalOptions[i][3],
        cLocalOptions[i][4],
        cLocalOptions[i][5],
        color,
        leavesGrade.leavesGrade,
        grade * level,
        false,
        recordID++
      )
    );
    if (debugFlag) {
      console.log(`++++++++++++++leavesGrade=${level} grade=${grade} `, result);
    }
  }

  /*  
  following will find the best next move from teh result boarday
  
  result array of sructure 

  [{value of leaves, line, col,color,grade}, ]
  
  */

  let nResult = calculateOptioTopGrade(result);

  if (debugResultFlag) {
    console.log(
      `_________________level=${level}, grade=${grade}, leave max grade=${nResult.currentGrade} `
    );
  }

  return nResult;
}

function computerNextMove() {
  /* calculateBestOption will return update board with new move in Optional boarday   */
  // //("computer turn");

  let result = [];

  result = move([], board, recursionLevel, computer, player);
  // console.log(result.endGameFlag,result.l,result.c);

  if (result.endGameFlag) {
    const cells = document.querySelectorAll(".cellR");

    for (let i = 0; i < cells.length; i++) {
      //

      cells[i].removeEventListener("click", clickedCell);

      cells[i].removeEventListener("mouseover", mouseOver);
    }
    console.log("game end");
    return;
  }
  flipLineToNewColorOnlyBoard(
    result.l,
    result.c,
    result.lineEnd,
    result.colEnd,
    result.lineDirection,
    result.colDirection,
    -50,
    -50,
    result.color,
    board
  );

  positionNewPiece(board);

  findPotentialNextPosition(player, computer, board, false);

  positionNewPiece(board);

  document.querySelector("#player-digit").innerText = board
    .flat()
    .filter((item) => item === player).length;
  document.querySelector("#computer-digit").innerText = board
    .flat()
    .filter((item) => item === computer).length;
}

/*-------------- Start Execuation ---------------*/

initGame();
