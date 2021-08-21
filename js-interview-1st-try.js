/* # Question: Determine if a Draw can be processed

## Background:

Within Built, every Project has a Budget which has a collection of budgetItems.These budgetItems represent costs associated with construction.Users can request cash Draws against budgetItems.

## Problem:

Given the provided Budget and DrawRequests data, fill in the body for the processDraws function below.This function should return an array of all the drawIds that were successfully processed according to the following rules:

- BudgetItems cannot be overdrawn
- The Drawable amount for BudgetItems is determined by subtracting a BudgetItems fundedToDate from its originalAmount
- Draws have to be processed in order of effectiveDate

## Starting code (Plain JavaScript variation)

```js */

const budget = {
  amount: 126000,
  balanceRemaining: 108500,
  budgetItems: [
    { itemId: 1, fundedToDate: 2500, originalAmount: 10000 },
    { itemId: 2, fundedToDate: 15000, originalAmount: 16000 },
    { itemId: 3, fundedToDate: 0, originalAmount: 100000 },
  ],
};

const drawRequests = [
  { drawId: 1, itemId: 2, amount: 750, effectiveDate: '11/15/2015' },
  { drawId: 2, itemId: 1, amount: 2000, effectiveDate: '11/20/2015' },
  { drawId: 3, itemId: 3, amount: 50000, effectiveDate: '10/5/2015' },
  { drawId: 4, itemId: 3, amount: 60000, effectiveDate: '10/6/2015' },
  { drawId: 5, itemId: 2, amount: 500, effectiveDate: '10/31/2015' },
  { drawId: 6, itemId: 3, amount: 50000, effectiveDate: '10/7/2015' },
  { drawId: 7, itemId: 2, amount: 1000, effectiveDate: '11/16/2015' },
];

function processDraws(drawRequests, budget) {
  //Define balance for each budget item
  let item1Bal =
    budget.budgetItems[0].originalAmount - budget.budgetItems[0].fundedToDate;
  let item2Bal =
    budget.budgetItems[1].originalAmount - budget.budgetItems[1].fundedToDate;
  let item3Bal =
    budget.budgetItems[2].originalAmount - budget.budgetItems[2].fundedToDate;

  // Sort draw requests by date
  drawRequests.sort(
    (a, b) => new Date(a.effectiveDate) - new Date(b.effectiveDate)
  );
  console.log(drawRequests);

  // Create new array for results
  const drawResults = [];

  // Attempt draw
  const attemptDraw = () => {
    drawRequests.forEach((item) => {
      if (item.itemId == 1) {
        console.log('Balance1 is ' + item1Bal);
        console.log('drawId is ' + item.drawId);
        console.log('draw amount is ' + item.amount);
        item1Bal = item1Bal - item.amount;
        console.log(item2Bal);
        if (item1Bal < 0) {
          item1Bal = item1Bal + item.amount;
          console.log('Draw unsuccessful; not enough funds');
          console.log();
        } else {
          console.log('New balance is ' + item1Bal + '. Draw successful.');
          console.log();
          drawResults.push(item);
        }
      }
      if (item.itemId == 2) {
        console.log('Balance2 is ' + item2Bal);
        console.log('drawId is ' + item.drawId);
        console.log('draw amount is ' + item.amount);
        item2Bal = item2Bal - item.amount;
        console.log(item2Bal);
        if (item2Bal < 0) {
          item2Bal = item2Bal + item.amount;
          console.log('Draw unsuccessful; not enough funds');
          console.log();
        } else {
          console.log('New balance is ' + item2Bal + '. Draw successful.');
          console.log();
          drawResults.push(item);
        }
      }
      if (item.itemId == 3) {
        console.log('Balance3 is ' + item3Bal);
        console.log('drawId is ' + item.drawId);
        console.log('draw amount is ' + item.amount);
        item3Bal = item3Bal - item.amount;
        console.log(item3Bal);
        if (item3Bal < 0) {
          item3Bal = item3Bal + item.amount;
          console.log('Draw unsuccessful; not enough funds');
          console.log();
        } else {
          console.log('New balance is ' + item3Bal + '. Draw successful.');
          console.log();
          drawResults.push(item);
        }
      }
    });
  };
  attemptDraw();
  return drawResults;
}

const results = processDraws(drawRequests, budget);
console.log(JSON.stringify(results, null, 2));
