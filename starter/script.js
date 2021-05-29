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
