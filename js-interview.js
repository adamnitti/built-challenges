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
    // Budget balances
    const budgetItemCount = budget.budgetItems.length;
    const balanceArray = [];

    // Define budget item balances
    for (i = 0; i < budgetItemCount; i++) {
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

    // Create new array for results
    const drawResults = [];

    // Attempt draw
    const attemptDraw = () => {
        // First establish number of budget items
        const numBudgetItems = balanceArray.length;
        console.log('total num budget items =', numBudgetItems);

        // Calculate budget balances for each budget item
        for (i = 1; i <= numBudgetItems; i++) {
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
                    currentBalance = currentBalance - item.amount;
                    // Test for insufficient funds
                    if (currentBalance < 0) {
                        console.log('insufficient funds. draw not processed');
                        currentBalance = currentBalance + item.amount;
                        console.log('current balance=', currentBalance);
                        // If sufficient funds commence draw
                    } else {
                        console.log(
                            'draw successful. remainder for',
                            balanceArray[i - 1].balanceName,
                            'is now',
                            currentBalance
                        );
                        // Add successful draw record to array
                        drawResults.push(item);
                        console.log('successful budget draws:', drawResults);
                    }
                }
            });
        }
    };
    attemptDraw();
    return drawResults;
}

const results = processDraws(drawRequests, budget);
console.log(JSON.stringify(results, null, 2));
