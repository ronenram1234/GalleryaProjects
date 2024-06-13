"use strict";

let operatorSign = "";
let calcDisplay = document.querySelector("#calcDisplay");
let charInput = "";
let stringInput = "";
let result = 0;
let firstNumber = 0;
let pointFlag = false;
let secondTimeAfterEquel = false;
let selectedOperated = "";

// calcDisplay.innerText = "0";

function initNewInput() {
  charInput = 0;
  result = 0;
  stringInput = "";
  pointFlag = false;
  //   calcDisplay.innerText="0"
}

/*
HL design
- input number - add charInput if  charinput= 1-9 or "." to stringInput 
    - pointFlag will ensure only one point added to teh number
- pressing any operator (excluding "C" and "=")will move stringInput to firstnumber to be saved
- pressing ("C") - clear all data - run initNewInput
- pressing ("=") = calculate using firstNumber, currentNumber, SelectedOperated


*/

function clickCalc(event) {
  // console.log(event);
  charInput = event.innerText;
  console.log(charInput);
  //   if (isNaN(Number(charInput))) {

  switch (charInput) {
    case "C":
      initNewInput();
      calcDisplay.innerText = "0";
      break;
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      stringInput += charInput;
      calcDisplay.innerText = stringInput;

      break;
    case ".":
      if (!pointFlag) {
        stringInput += charInput;
        calcDisplay.innerText = stringInput;
        pointFlag = true;
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "**":
    case "mod":
      
      firstNumber = Number(stringInput);
      selectedOperated = charInput;
      console.log(firstNumber);
      initNewInput();
      break;
    case "sin":
      calcDisplay.innerText = (Math.sin(Number(stringInput))).toFixed(4);

      firstNumber = 0;
      selectedOperated = "";
      initNewInput();
      break;
    case "cos":
      calcDisplay.innerText = (Math.cos(Number(stringInput))).toFixed(4);
      firstNumber = 0;
      selectedOperated = "";
      initNewInput();
      break;
    case "=":
      switch (selectedOperated) {
        case "+":
          result = firstNumber + Number(stringInput);
          calcDisplay.innerText = result;

          break;
        case "-":
          result = firstNumber - Number(stringInput);
          calcDisplay.innerText = result;

          break;
        case "*":
          result = firstNumber * Number(stringInput);
          calcDisplay.innerText = result;

          break;
        case "/":
          if (stringInput != "0" && stringInput != "") {
            result = (firstNumber / Number(stringInput)).toFixed(4);
            calcDisplay.innerText = result;
          } else {
            calcDisplay.innerText = "wrong operator";
          }

          break;
        case "**":
          result = firstNumber ** Number(stringInput);
          calcDisplay.innerText = result;

          break;
        case "mod":
          if (stringInput != "0" && stringInput != "") {
            result = firstNumber % Number(stringInput);
            calcDisplay.innerText = result;
          } else {
            calcDisplay.innerText = "wrong operator";
          }

          break;
      }
      // init counters
      initNewInput();
      firstNumber = 0;
      selectedOperated = "";
      break;
  }
}
