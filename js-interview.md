# Question: Determine if a Draw can be processed

## Background:

Within Built, every Project has a Budget which has a collection of budgetItems.These budgetItems represent costs associated with construction.Users can request cash Draws against budgetItems.

## Problem:

Given the provided Budget and DrawRequests data, fill in the body for the processDraws function below.This function should return an array of all the drawIds that were successfully processed according to the following rules:

-   BudgetItems cannot be overdrawn
-   The Drawable amount for BudgetItems is determined by subtracting a BudgetItems fundedToDate from its originalAmount
-   Draws have to be processed in order of effectiveDate

## Starting code (Plain JavaScript variation)

```js
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
    //@todo implement solution here
}

const results = processDraws(drawRequests, budget);
console.log(JSON.stringify(results, null, 2));
```

## Starting code (React variation)

```jsx
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/umd/react-dom.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
  </head>

  <body>
    <div id="root"></div>
    <script type="text/babel">
      const drawRequests = [
        { drawId : 1, itemId : 2, amount : 750, effectiveDate : '11/15/2015'},
        { drawId : 2, itemId : 1, amount : 2000, effectiveDate : '11/20/2015'},
        { drawId : 3, itemId : 3, amount : 50000, effectiveDate : '10/5/2015'},
        { drawId : 4, itemId : 3, amount : 60000, effectiveDate : '10/6/2015'},
        { drawId : 5, itemId : 2, amount : 500, effectiveDate : '10/31/2015'},
        { drawId : 6, itemId : 3, amount : 50000, effectiveDate : '10/7/2015'},
        { drawId : 7, itemId : 2, amount : 1000, effectiveDate : '11/16/2015'},
      ];

      class Budget extends React.Component {
        constructor(props) {
          super(props)
        }

        state = {
          amount : 126000,
          balanceRemaining : 108500,
          budgetItems : [
            { itemId : 1, fundedToDate : 2500, originalAmount : 10000},
            { itemId : 2, fundedToDate : 15000, originalAmount : 16000},
            { itemId : 3, fundedToDate : 0, originalAmount : 100000},
          ]
        }

        render = () => {
          return <span>output here</span>;
        }
      }

      class App extends React.Component {
        render = () => { return this.props.children; }
      }

      ReactDOM.render(
        <App>
          <Budget drawRequests={drawRequests} />
        </App>,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

## Bonus 1

Modify the processDraws function to also update the Budget by reference according to the following rules:

-   update each BudgetItem's fundedToDate appropriately
-   update the Budget's balanceRemaining appropriately

## Bonus 2 (and example solution)

Add error handling to processDraws and change the return type to be an object with two keys:

1. "successfullyProcessed": contains all the drawIds that were successfully processed
2. "errors": contains an entry for each drawId that failed along with a message describing why it failed

Add the following data to drawRequests to trigger errors:

```
[
  { drawId : 8, itemId: 'nope', amount: 750, effectiveDate: '11/15/2015' },
  { drawId : 9, itemId: 1, amount: 10 },
  { drawId : 10, itemId: 2, amount: '100', effectiveDate: '10/31/2014' },
  { drawId : 11, itemId: 3, amount: 1, effectiveDate: 'A long long time ago...' },
  { drawId : 12, itemId: 1, amount: 100, effectiveDate: 10 / 31 / 2099 },
  { drawId : 13, itemId: 1, amount: -100000, effectiveDate: '11/8/2015' }
]
```

## Bonus 3 (and example solution)

Log a message for each BudgetItem that lists the order each Draw was processed in (a `console.log` is an appropriate way to display this message) or include this data in the return array.

Note: it is safe to assume that the Budget and every budgetItem will never have a remaining balance below zero.
