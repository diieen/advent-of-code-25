import fs from "fs";

const ranges = fs.readFileSync("data.txt", "utf8");
const rangesArr = ranges.trim().split(",");

let sum = 0;

for (let range of rangesArr) {
  const min = Number(range.split("-")[0]);
  const minLength = String(min).split("").length;
  const minIsOdd = minLength % 2 === 1;

  const max = Number(range.split("-")[1]);
  const maxLength = String(max).split("").length;
  const maxIsOdd = maxLength % 2 === 1;

  const average = Math.floor((min + max) / 2);
  const isOdd = minIsOdd && maxIsOdd && average % 2 === 1;

  if (isOdd) {
    continue;
  }

  let minHalfLeft = Number(
    String(min)
      .split("")
      .slice(0, minLength / 2 + (minIsOdd ? 1 : 0))
      .join("")
  );

  const minHalfRight = String(min)
    .split("")
    .slice(minLength / 2 + (minIsOdd ? 1 : 0))
    .join("");

  let numberLength = minHalfRight.length;
  let baseR = Number("0".repeat(numberLength)) || 0;

  for (let i = min; i <= max; ) {
    if (minHalfLeft > Number(minHalfRight)) {
      const nextInvalid = Number(`${minHalfLeft}${minHalfLeft}`);

      if (nextInvalid <= max) {
        sum = sum + nextInvalid;
      }
    }

    minHalfLeft++;
    i = Number(`${minHalfLeft}${minHalfRight === "" ? "" : baseR}`);
  }
}

console.log(sum);

// function findInvalidId(l, r, max) {
//   let baseR = parseInt("0".repeat(String(r).length)) || 0;

//   while (true) {
//     const integer = Number(`${l}${r}`);

//     if (integer > max) break;

//     if (l > r) {
//       const nextInvalid = Number(`${l}${l}`);
//       if (nextInvalid <= max) {
//         sum += nextInvalid;
//       }
//     }

//     l = l + 1;
//     r = baseR;
//   }
// }

// import fs from "fs";

// const content = fs.readFileSync("data.txt", "utf8");
// const rangesArr = content.trim().split(",");

// let total = 0n; // BigInt

// for (const range of rangesArr) {
//   const [minStr, maxStr] = range.split("-").map(s => s.trim());

//   let min = BigInt(minStr);
//   let max = BigInt(maxStr);

//   // garante que min <= max
//   if (min > max) {
//     const tmp = min;
//     min = max;
//     max = tmp;
//   }

//   total += sumDoubleNumbersInRange(min, max);
// }

// console.log(total.toString());

// /**
//  * Soma todos os números da forma "ll" (um número colado com ele mesmo)
//  * que estão no intervalo [min, max].
//  */
// function sumDoubleNumbersInRange(min, max) {
//   let sum = 0n;
//   const ten = 10n;

//   // vamos variar o número de dígitos de l: k = 1, 2, 3, ...
//   for (let k = 1; ; k++) {
//     const kBig = BigInt(k);

//     const pow10k     = ten ** kBig;        // 10^k
//     const pow10k_1   = ten ** (kBig - 1n); // 10^(k-1)
//     const factor     = pow10k + 1n;        // 10^k + 1

//     // menor l com k dígitos
//     const minLForK = pow10k_1;

//     // menor "ll" possível com k dígitos em l
//     const minLL = minLForK * factor;

//     // se o menor ll possível já é maior que max, não tem mais nada pra somar
//     if (minLL > max) break;

//     const maxLForK = pow10k - 1n; // maior l com k dígitos

//     // l >= ceil(min / factor)
//     let lStart = min / factor;
//     if (min % factor !== 0n) lStart += 1n;

//     // l <= floor(max / factor)
//     let lEnd = max / factor;

//     // respeita os limites de k dígitos
//     if (lStart < minLForK) lStart = minLForK;
//     if (lEnd > maxLForK)   lEnd   = maxLForK;

//     // se o intervalo ficar vazio, não há ll com esse k
//     if (lStart > lEnd) continue;

//     const n    = lEnd - lStart + 1n;      // quantidade de termos
//     const sumL = n * (lStart + lEnd) / 2n; // soma de lStart..lEnd

//     // soma de ll = soma de l * factor
//     sum += factor * sumL;
//   }

//   return sum;
// }
