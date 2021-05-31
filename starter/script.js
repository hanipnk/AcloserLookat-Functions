'use strict';

/*
// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5 Version to set default
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000); // when I want to skip the second parameter, I can use ' Undefined'

*/

/*  

// Value vs Reference (MISTAKES WHICH EAST TO MAKE)

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; // it does not affect anything
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};
// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
console.log(jonas); //----> the original value of object get changed after the function runs.
//It is because they are pointing at the same memory HEAP. NOT TWO SEPARATE VARIABLES.

*/

/*

// First-Class and Higher-Order Functions

// First Class Functions(simplay means all functions are values) :

// JavaScript treats functions as first-class citizens
// This means that functions are simplay values
// Functions are just another 'type' of object

// Higher-Order Functions :

// A function that receives another function as an argument, that returns a new function, or Both
// this is only possible because of first-class functions

*/

/*
// Functions Accepting Callback Functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

// JS uses callback all the time
const high5 = function () {
  console.log('hi');
};

document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

*/

/*

// My own example
const userinfo = {
  name: 'Heeyoung Park',
  speaking: 7,
  listening: 8,
  writing: 5,
  reading: 8,
};
const tests = Object.values(userinfo);
//console.log(tests);

const calcaverage = function (info) {
  let sum = 0;
  for (const [i, test] of tests.entries()) {
    if (i != 0) {
      sum = sum + test;
    }
    //console.log(sum);
  }
  const average = sum / (tests.length - 1);
  return average;
};
calcaverage(userinfo);

const passOrFail = function (info, fn) {
  if (fn(info) >= 6) {
    console.log(
      `${info.name}, your average test result is ${fn(
        info
      )}. Congrat! You passed the test!`
    );
  } else {
    console.log(`${info.name}, You are not selected`);
  }
};

passOrFail(userinfo, calcaverage);

*/

/*

// Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Function returns function with using arrow function
const greet1 = greeting1 => name1 => console.log(`${greeting1} ${name1}`);

greet1('hi')("I'm Sorry");

*/

/*

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name }); // I need '{}' because these are another object itself
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // function is a value itselft as well so I can store it into a variable

//book(23, 'Sara Williams'); // since I stored 'lufthansa.book' into a new variable, it's now a regular function outside of the object
// So 'this'keyword inside of 'book' function has nowhere to point out. = > 'undefined'

// Call Method
book.call(eurowings, 23, 'Sarah Willianms');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 58, 'Mary Cooper');
console.log(swiss);

// Apply method  --> same as call methoed but it gets an array as an argument
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);
// 'Applay' metoed is not often used in modern JS because of  '...' spread operator

*/

/*
// Bind Methoed
//book.call(eurowings, 23, 'Sara Williams')

// Bind Methoed sets function itself into a new variable for multiple uses
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams'); // I dont have to set 'this'keyword argument as a first argument

const bookEW23 = book.bind(eurowings, 23); // bind can also pre-set the argument 'flightNum'
// It is called 'partial application' which means a part of the arguments of the original function are 'already applied'
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With EventListeners

lufthansa.planes = 300; // adding more keys in lufthansa object.
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// I do not 'call' the function. I want to just 'set' 'where to 'this' keyword to point out
// If I use 'call' methoed I have to use the function right away but in this case, in event handler function, I DO NOT call the function

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// addVAT = value => value + value *0.23
const addVAT = addTax.bind(null, 0.23); // there's no 'this' key workd in 'addTax' function. so just make it 'null' CANNOT be empty
// pre-set the 'rate' as 0.23
// when i want to pre-set the argument, it has to be always the 'First argument' to be used.
// ORDER of ARGUMENTS is IMPORTANT
// I could pre-set the 'rate' parameter in 'addTax' function, HOWEVER, that changes the original function.
// with 'bind' methoed, it gives me a NEW function
console.log(addVAT(100));
console.log(addVAT(23));

//Making Function inside of function
// Solution
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
console.log(addTaxRate(0.23)(100));

// ONTARIO HST
const calHST = function (value) {
  return function (rate) {
    // make sure to write 'return'
    return value + value * rate;
  };
};

console.log(calHST(100)(0.13));

*/

/*

// Coding Challenge #1
// const poll = {
//   question: 'What is your favourite programming language?',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     let str = '';
//     for (const option of this.options) {
//       str = str + option + '\n';
//       //console.log(option);
//     }
//     //console.log(str);
//     const vote = Number(prompt(`${this.question}\n${str}`));
//     if (vote === 0) {
//       this.answers[0]++;
//       return this.displayResults();
//     } else if (vote === 1) {
//       this.answers[1]++;
//       return this.displayResults();
//     } else if (vote === 2) {
//       this.answers[2]++;
//       return this.displayResults();
//     } else if (vote === 3) {
//       this.answers[3]++;
//       return this.displayResults();
//     } else {
//       console.log('Not a valied Number!');
//     }
//   },
//   displayResults() {
//     console.log(Object.values(this.answers));
//   },
// };

// //console.log(poll.answers);

// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

//--------------------------Bonus Question
// const Data1 = [5, 2, 3];
// const Data2 = [1, 5, 3, 9, 6, 1];

// const result = poll.displayResults;

// const dataresult = result.bind(Data1);
// dataresult();

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    //console.log(this.answers);
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};

//poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

// Make sure to print same format as where 'this'keyword points out
//in this case, (this.answers) is exist in the object therefore '{}' is needed to have same format as 'answers'
// I can also have second parameter which is either 'array' or 'string'. since 'array' is default I dont have to put 'array' in but 'string'
// the first parameter should always be 'where this keyword to point to'

*/

/*
// Immediately Invoked Function Expressions ( IIFE )
//regular function 
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// 1) do not have to ser in a variable
// 2) '(function)' for the entire function body
// 3) (function) then '()' at the end of function to excute


// console.log(isPrivate);    -> script.js:418 Uncaught ReferenceError: isPrivate is not defined
// I cannot access 'isprivate' variable because of scope chain
//inner scoap can access to global scope but not other way around

// IIFE for arrow function
(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}


//console.log(isPrivate);
console.log(notPrivate);

*/

/*

// Closures

// Closures have a priority over the scope chain
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount}passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

*/

/*
// More examples of Closures
// Example 1

let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
console.dir(f);

// Re - assigning f function
h();
f();

console.dir(f);

// Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all in ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // even though 'pergroup' is assinged in global scope, closure is over the scope chain.
boardPassengers(180, 3);

// setTimeout(function () {
//   console.log('TIMER');
// }, 1000);

// 'setTimeout' is a 'call back function' because it will be called after one second in this case
// 'setTimeout' needs two parameters first one will be function and second one will be setting time (function(){}, 1000)
// 1000 mili second = 1 second -> it will appear after 1 second

*/

// Coding Challenge #2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
