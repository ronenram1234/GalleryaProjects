"use strict";

function positionNewPiece(col, row, color) {
  console.log(col, row, color);
  console.log(`.inLine${row}`);
  let rowP = document.querySelectorAll(`.inLine${row}`);
  console.log(rowP);
}

positionNewPiece(2, 3, "white");
