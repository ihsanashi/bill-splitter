// query for elements from html
// validate each input, ensure that they are in a number format and are of sensible values
// for each input with a badly formatted value, add an error message to a list. once a properly formatted value is entered for that input, remove the previous error message
// show the list of errors as an unordered list below the calculator section
// once there are no more errors, empty out the array and remove the error section from the DOM
// do the calculation for the results and finally, display the results section underneath the calculator
// if at any point the reset button is clicked, empty out the error messages list, clear the input fields, and remove the error and result section from the DOM

const main = document.getElementById('main');
const form = document.getElementById('calculation');
const bill = document.getElementById('billAmount');
const tip = document.getElementById('tipAmount');
const people = document.getElementById('peopleAmount');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');

let isBillValid = false;
let isTipValid = false;
let isPeopleValid = false;

let errors = [];

form.addEventListener('change', () => {
  console.log(errors);

  if (isBillValid && isTipValid && isPeopleValid) {
    calculateBtn.classList.remove('disable');
    calculateBtn.disabled = false;
  } else {
    calculateBtn.classList.add('disable');
    calculateBtn.disabled = true;
  }
});

calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (isBillValid && isTipValid && isPeopleValid) {
    calculateResult();
  }
});

function calculateResult() {
  console.log('Valid form');
}

bill.addEventListener('change', (e) => {
  const notNumberMsg = 'Bill input must be a number';
  const invalidNumberMsg =
    'Bill amount must be a positive value that is more than 0';

  if (isNaN(e.target.value)) {
    e.target.value = '';
    if (errors.includes(notNumberMsg) === false) {
      errors.push(notNumberMsg);
      bill.classList.add('error-border');
      isBillValid = false;
    }
  } else if (e.target.value < 0) {
    e.target.value = '';
    if (errors.includes(invalidNumberMsg) === false) {
      errors.push(invalidNumberMsg);
      bill.classList.add('error-border');
      isBillValid = false;
    }
  } else {
    e.target.value = Number(e.target.value).toString();
    errors = errors.filter((val) => val !== notNumberMsg);
    errors = errors.filter((val) => val !== invalidNumberMsg);
    bill.classList.remove('error-border');
    isBillValid = true;
  }

  return isBillValid;
});

tip.addEventListener('change', (e) => {
  const notNumberMsg = 'Tip input must be a number';
  const invalidNumberMsg = 'Please stick to a number between 0 and 100!';

  if (isNaN(e.target.value)) {
    e.target.value = '';
    if (errors.includes(notNumberMsg) === false) {
      errors.push(notNumberMsg);
      tip.classList.add('error-border');
      isTipValid = false;
    }
  } else if (e.target.value < 0 || e.target.value > 100) {
    e.target.value = '';
    if (errors.includes(invalidNumberMsg) === false) {
      errors.push(invalidNumberMsg);
      tip.classList.add('error-border');
      isTipValid = false;
    }
  } else {
    e.target.value = Number(e.target.value).toString();
    errors = errors.filter((val) => val !== notNumberMsg);
    errors = errors.filter((val) => val !== invalidNumberMsg);
    tip.classList.remove('error-border');
    isTipValid = true;
  }

  return isTipValid;
});

people.addEventListener('change', (e) => {
  const notNumberMsg = 'People input must be a number';
  const invalidNumberMsg = 'People input has to be a positive whole number';

  if (isNaN(e.target.value)) {
    e.target.value = '';
    if (errors.includes(notNumberMsg) === false) {
      errors.push(notNumberMsg);
      people.classList.add('error-border');
      isPeopleValid = false;
    }
  } else if (e.target.value < 0 || e.target.value % 1 !== 0) {
    e.target.value = '';
    if (errors.includes(invalidNumberMsg) === false) {
      errors.push(invalidNumberMsg);
      people.classList.add('error-border');
      isPeopleValid = false;
    }
  } else {
    e.target.value = Number(e.target.value).toString();
    errors = errors.filter((val) => val !== notNumberMsg);
    errors = errors.filter((val) => val !== invalidNumberMsg);
    // so splice is a very dangerous operation jfc
    people.classList.remove('error-border');
    isPeopleValid = true;
  }

  return isPeopleValid;
});

resetBtn.addEventListener('click', () => {
  errors = [];
  bill.classList.remove('error-border');
  tip.classList.remove('error-border');
  people.classList.remove('error-border');
  isBillValid = false;
  isTipValid = false;
  isPeopleValid = false;
  calculateBtn.disabled = true;
  calculateBtn.classList.add('disable');
  document.contains(errorSection) ? main.removeChild(errorSection) : '';
  document.contains(errorUl) ? errorContainer.removeChild(errorUl) : '';
});
