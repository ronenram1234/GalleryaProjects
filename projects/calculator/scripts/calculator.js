"use strict";

let operatorSign = "";
let calcDisplay = document.querySelector("#calcDisplay");
let charInput = "";
let stringInput = "";
let result = 0;
let firstNumber = 0;
let pointFlag = false;
let multipleOperatorInput = false;
let lastOperatorWasEquel = false;
let selectedOperated = "";



function initNewInput() {
  charInput = 0;
  result = 0;
  stringInput = "";
  pointFlag = false;
  
}

/*
HL design
- input number - add charInput if  charinput= 1-9 or "." to stringInput 
    - pointFlag will ensure only one point added to teh number
- pressing any operator (excluding "C" and "=")will move stringInput to firstnumber to be saved
- pressing ("C") - clear all data - run initNewInput
- pressing ("=") = calculate using firstNumber, currentNumber, and SelectedOperated

- operator switch should handle
  first time - i.e:x+y ->display show y
  multiple numbers and ops - i.e: "x+y-z+n-" display show calculate result  
  operator after "=" - i.e x+y"="  +z


*/

function clickCalc(event) {
  
  charInput = event.innerText;
  

  switch (charInput) {
    case "C":
      initNewInput();
      calcDisplay.innerText = "0";
      multipleOperatorInput = false;
      firstNumber = 0;
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
      if (!multipleOperatorInput) {
        multipleOperatorInput = false;
        stringInput = "";
      }
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
    case "=":
      
      result = parseFloat(
        eval(
          `${firstNumber}${
            selectedOperated != "mod" ? selectedOperated : "%"
          }${Number(stringInput)}`
        ).toFixed(4)
      );
      console.log(result);
      calcDisplay.innerText = result;
      pointFlag = false;
      firstNumber = result;
      
      lastOperatorWasEquel = true;
      selectedOperated = "";
      stringInput = "";
      break;
    case "+":
    case "-":
    case "*":
    case "/":
    case "**":
    case "mod":
      if (!multipleOperatorInput) {
        firstNumber = Number(stringInput);
        selectedOperated = charInput;

        initNewInput();
        multipleOperatorInput = true;
      } else {
        if (!lastOperatorWasEquel) {
          result = parseFloat(
            eval(
              `${firstNumber}${
                selectedOperated != "mod" ? selectedOperated : "%"
              }${Number(stringInput)}`
            ).toFixed(4)
          );

          calcDisplay.innerText = result;
          
          firstNumber = result;
          stringInput = "";
        }
        lastOperatorWasEquel = false;
        multipleOperatorInput = true;
        selectedOperated = charInput;
      }
      break;
    case "sin":
      calcDisplay.innerText = Math.sin(Number(stringInput)).toFixed(4);

      firstNumber = 0;
      selectedOperated = "";
      initNewInput();
      break;
    case "cos":
      calcDisplay.innerText = Math.cos(Number(stringInput)).toFixed(4);
      firstNumber = 0;
      selectedOperated = "";
      initNewInput();
      break;
  }
}

const butt = document.querySelectorAll("button");

butt.forEach((b) =>
  b.addEventListener("click", function (e) {
    clickCalc(e.target);
    
  })
);
