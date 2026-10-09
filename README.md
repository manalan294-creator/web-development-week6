# SpendWise Interactive

SpendWise is a small budgeting dashboard that helps users track their monthly spending. This version adds JavaScript interactivity so the page can make decisions, store multiple records, update the dashboard in real time, and react to user actions.

## Improvements made this week

- Added a monthly budget input and live update button.
- Created an expense form where users can add item name, category, and amount.
- Displayed expense records in a dynamic list with totals and remaining balance.
- Added status feedback that changes depending on whether the user is within budget or over budget.
- Included delete controls so users can remove expense records from the dashboard.

## How conditionals are used

The application uses conditional statements to decide what the user sees based on their remaining balance. For example:

- If the remaining budget is above 200, the status is shown as positive.
- If it is between 0 and 200, the app shows a neutral status.
- If the total spending exceeds the budget, the app warns the user with a caution or danger message.

These conditionals are implemented in the `getBudgetStatus()` function in the JavaScript file.

## How arrays are used to store data

The project stores each expense as an object inside an array. The array keeps all expense records together so the app can calculate totals, loop through items, and render them to the screen.

This makes it easy to add, remove, and display multiple expense entries without creating separate variables for each one.

## How the DOM is updated

The DOM is updated dynamically after every user action. When a budget changes or a new expense is added, JavaScript recalculates values and updates the elements on the page:

- budget summary values
- spent amount
- remaining balance
- status message
- expense list

This is done with `textContent`, `innerHTML`, and dynamically created elements.

## How user interactions are handled through events

The page responds to several user interactions using event listeners:

- clicking the Update button changes the monthly budget
- submitting the expense form adds a new record
- clicking Reset clears all expenses
- clicking Delete removes a single expense record

These listeners connect user actions to JavaScript logic and update the interface instantly.

## Challenges and solutions

One challenge was keeping the dashboard in sync after every change. To solve this, the same rendering logic was reused each time the data changed, so the totals and expense list always stayed consistent.

Another challenge was making sure the page responded correctly to different budget states. This was solved by using clear conditional checks to define the right status message and color for each scenario.

## Files in the project

- `index.html` contains the page structure.
- `style.css` handles the app layout and visual styling.
- `script.js` contains the logic for arrays, conditionals, loops, events, and DOM updates.

## Run the project

Open `index.html` in a browser to use the SpendWise dashboard.
