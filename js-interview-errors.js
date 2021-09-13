'use strict';

let budget = {
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
    /* { drawId: 8, itemId: 'nope', amount: 750, effectiveDate: '11/15/2015' },
    { drawId: 9, itemId: 1, amount: 10 },
    { drawId: 10, itemId: 2, amount: '100', effectiveDate: '10/31/2014' },
    {
        drawId: 11,
        itemId: 3,
        amount: 1,
        effectiveDate: 'A long long time ago...',
    },
    { drawId: 12, itemId: 1, amount: 100, effectiveDate: 10 / 31 / 2099 },
    { drawId: 13, itemId: 1, amount: -100000, effectiveDate: '11/8/2015' }, */
];

function processDraws(drawRequests, budget) {
    // Budget balances
    const budgetItemCount = budget.budgetItems.length;
    const balanceArray = [];

    // Define budget item balances
    for (let i = 0; i < budgetItemCount; i++) {
        const balanceName = 'balance' + (i + 1);
        const itemBalance =
            budget.budgetItems[i].originalAmount -
            budget.budgetItems[i].fundedToDate;
        balanceArray.push({
            balanceName: balanceName,
            itemId: i + 1,
            balance: itemBalance,
        });
    }
    console.log('stored budget balances to draw against:', balanceArray);

    // Sort draw requests by date
    drawRequests.sort(
        (a, b) => new Date(a.effectiveDate) - new Date(b.effectiveDate)
    );
    console.log('draw requests sorted by date:', drawRequests);

    return attemptDraw(balanceArray);
}

const results = processDraws(drawRequests, budget);
console.log(JSON.stringify(results, null, 2));

//
// For brevity, putting business logic here:
//

// Attempt draw
function attemptDraw(balanceArray) {
    // Create new array for results
    const drawResults = { successfullyProcessed: [], errors: [] };
    // First establish number of budget items
    const numBudgetItems = balanceArray.length;
    console.log('total num budget items =', numBudgetItems);

    // Calculate budget balances for each budget item
    for (let i = 1; i <= numBudgetItems; i++) {
        let currentBalance = balanceArray[i - 1].balance;
        console.log(
            'current balance for',
            balanceArray[i - 1].balanceName,
            'is:',
            currentBalance
        );

        // Make draw requests based on budget item number/id
        drawRequests.forEach((item) => {
            if (item.itemId == i) {
                console.log(
                    'processing draw amount',
                    item.amount,
                    'from',
                    currentBalance
                );
            }
            // Testing for insufficient funds
            console.log('checking', item);
            if (currentBalance - item.amount < 0) {
                console.log('insufficient funds. draw not processed');
                console.log('current balance=', currentBalance, '\n');
            } else {
                // Update budget balance
                currentBalance = currentBalance - item.amount;
                // Update funded to date amount
                budget.budgetItems[i - 1].fundedToDate =
                    budget.budgetItems[i - 1].fundedToDate + item.amount;
                // Update total project budget balance remaining
                budget.balanceRemaining = budget.balanceRemaining - item.amount;
                console.log(
                    'draw successful. remainder for',
                    balanceArray[i - 1].balanceName,
                    'is now',
                    currentBalance
                );
                console.log(
                    balanceArray[i - 1].balanceName,
                    'funded to date=',
                    budget.budgetItems[i - 1].fundedToDate
                );
                console.log(
                    'remaining balance=',
                    budget.balanceRemaining,
                    '\n'
                );
                // Add successful draw record to array
                drawResults.successfullyProcessed.push({ item });
                //console.log('successful budget draws:', drawResults);
            }
        });
    }
    return drawResults;
}

if (
    item.itemId <= 0 ||
    item.itemId > numBudgetItems ||
    !(typeof item.itemId == 'number')
) {
    console.log('Draw not processed due to invalid itemId', '\n');
    drawResults.errors.push(item);
    drawResults.errors.message.push('Draw not processed due to invalid itemId');
}
if (item.amount < 0 || !(typeof item.amount == 'number')) {
    console.log('Draw not processed due to invalid draw amount', '\n');
    drawResults.errors.push(item);
}
if (!validateDate(item.effectiveDate) || !('effectiveDate' in item)) {
    console.log('Draw not processed due to invalid date format', '\n');
    drawResults.errors.push(item);
}
// Setup date format verify
function validateDate(testdate) {
    var date_regex =
        /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    return date_regex.test(testdate);
}
