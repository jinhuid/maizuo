const arr = [1, 2, 3, 4, 5, 6]

const sum = (arr, i = 0) => i === arr.length ? 0 : arr[i] + sum(arr, i + 1)
console.log(sum(arr, 0));

const factorial = (n) => n === 1 ? 1 : n * factorial(n - 1)

console.log(factorial(5));