const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

function cleanInputString(str) { // to check fo clea input with no + - / and " "
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

function isInvalidInput(str) {    // to check for invalid inputs xuch as 10e2
  const regex = /\d+e\d+/i;``
  return str.match(regex);      //it returns the invalid input
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); //it calls the element with .input-container class which is in an element that has the value of entryDropdown as its id
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;   //selects all text type inputs beacause we have a budgeth input so we cant use numerical inputs
                                                                                                //then counts them +1 so we have their number
  const HTMLString = `                                                                          
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>  <!--here we creat a label element for input with id that is formed from a combination of entry dropdon value and its number-->
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />    <!--here we created an input we explained id and a placeholder-->
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number" 
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);       //here we update our html text and we use insertAjacentHtml insted of innerHtml so our past data dont be removed
}

function calculateCalories(e) {
  e.preventDefault();     //it's a traditional way to stop the submition of form elemnt to reload the page
  isError = false;

  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');   //we select all of our number inputs to calculate them
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  if (isError) {
    return;
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit'; //a condition so if remainingCalories is less than 0 it returns surplus and if not deficit
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide');    //we remove hide from output class so the css code to hide it dosn't run
}

function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {                     // it comes and select item one by one and clean them 
    const currVal = cleanInputString(item.value);        //to get value from
    const invalidInputMatch = isInvalidInput(currVal);

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
  }
  return calories;
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);
clearButton.addEventListener("click", clearForm);
