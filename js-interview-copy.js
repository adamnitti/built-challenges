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
    { drawId: 8, itemId: 16, amount: 750, effectiveDate: '11/15/2015' },
    { drawId: 10, itemId: 3, amount: -1, effectiveDate: '10/5/2015' },
    { drawId: 9, itemId: 1, amount: 2000, effectiveDate: 123345 },
];

function processDraws(drawRequests, budget) {
    //@todo implement solution here

    const numBudgetItems = budget.budgetItems.length;
    const resultsArray = { successfulDraws: [], unsuccessfulDraws: [] };

    checkErrors(drawRequests);

    attemptDraw(resultsArray.successfulDraws);

    function attemptDraw(item) {
        console.log(resultsArray.successfulDraws);
        item.forEach((draw) => {
            for (i = 0; i < numBudgetItems; i++) {
                const budgetItem = budget.budgetItems;
                let itemRemainder =
                    budgetItem[i].originalAmount - budgetItem[i].fundedToDate;
                console.log('in for loop');
            }
            //console.log('attempting draw', draw);
        });
    }

    function checkErrors(request) {
        request.forEach((item) => {
            let itemIndex = request.indexOf(item);
            console.log('checking drawId index:', itemIndex);

            if (
                item.itemId <= 0 ||
                item.itemId > numBudgetItems ||
                !(typeof item.itemId == 'number')
            ) {
                console.log(
                    'Draw not processed due to invalid itemId',
                    item.itemId
                );

                console.log('itemIndex = ', itemIndex);
                resultsArray.unsuccessfulDraws.push(item);
            } else if (item.amount < 0 || !(typeof item.amount == 'number')) {
                console.log(
                    'Draw not processed due to invalid draw amount',
                    item.amount
                );

                console.log('itemIndex = ', itemIndex);
                resultsArray.unsuccessfulDraws.push(item);
            } else if (!validateDate(item.effectiveDate)) {
                console.log(
                    'Draw not processed due to invalid date format',
                    item.effectiveDate
                );

                console.log('itemIndex = ', itemIndex);
                resultsArray.unsuccessfulDraws.push(item);
            } else {
                resultsArray.successfulDraws.push(item);
                resultsArray.successfulDraws.sort(
                    (a, b) =>
                        new Date(a.effectiveDate) - new Date(b.effectiveDate)
                );
            }
            //console.log(resultsArray);
        });
    }

    // Setup date format verify
    function validateDate(testdate) {
        var date_regex =
            /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        return date_regex.test(testdate);
    }

    return drawRequests;
}

const results = processDraws(drawRequests, budget);
//console.log(JSON.stringify(results, null, 2));
