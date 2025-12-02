import fs from "fs";

const instructions = fs.readFileSync("data.txt", "utf8");
const instructionsArr = instructions.trim().split(/\s+/);

let zeroAppearancesWhenWheelStop = 0;
let zeroAppearances = 0;
let actualValue = 50;

for (let instruction of instructionsArr) {
  const direction = instruction.charAt(0);
  const times = parseInt(instruction.substring(1));

  for (let i = 0; i < times; i++) {
    if (direction == "R") {
      actualValue++;

      if (actualValue == 100) {
        actualValue = 0;
      }
    } else {
      actualValue--;

      if (actualValue == -1) {
        actualValue = 99;
      }
    }

    if (actualValue === 0) zeroAppearances++;
  }

  if (actualValue === 0) zeroAppearancesWhenWheelStop++;
}

// Response Part 1
console.log(zeroAppearancesWhenWheelStop); // 1118
// Response Part 2
console.log(zeroAppearances); // 6289