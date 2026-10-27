// CN5006 Week 1 Portfolio Exercise
// Basic arithmetic operations on two numbers.
const prompt = require("prompt-sync")();

const firstInput = prompt("Enter the first number: ");
const secondInput = prompt("Enter the second number: ");

const num1 = Number(firstInput);
const num2 = Number(secondInput);

if (
  firstInput.trim() === "" ||
  secondInput.trim() === "" ||
  !Number.isFinite(num1) ||
  !Number.isFinite(num2)
) {
  console.log("Please enter valid numbers.");
} else {
  console.log(`Addition: ${num1} + ${num2} = ${num1 + num2}`);
  console.log(`Subtraction: ${num1} - ${num2} = ${num1 - num2}`);
  console.log(`Multiplication: ${num1} * ${num2} = ${num1 * num2}`);

  if (num2 === 0) {
    console.log("Division: cannot divide by zero.");
  } else {
    console.log(`Division: ${num1} / ${num2} = ${num1 / num2}`);
  }
}
