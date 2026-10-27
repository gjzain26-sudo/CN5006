// CN5006 Week 1 — Check whether a number is positive, negative, or zero
const prompt = require("prompt-sync")();

console.log("Starting");
const name = prompt("Enter your name: ");
console.log(`Hello, ${name}!`);

const input = prompt("Enter a number: ");
const number = Number(input);

if (input.trim() === "" || !Number.isFinite(number)) {
  console.log("Please enter a valid number.");
} else if (number > 0) {
  console.log("The number is positive");
} else if (number === 0) {
  console.log("The number is zero");
} else {
  console.log("The number is negative");
}
