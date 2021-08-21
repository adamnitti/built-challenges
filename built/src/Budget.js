import React from 'react';

class Budget extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        amount: 126000,
        balanceRemaining: 108500,
        budgetItems: [
            { itemId: 1, fundedToDate: 2500, originalAmount: 10000 },
            { itemId: 2, fundedToDate: 15000, originalAmount: 16000 },
            { itemId: 3, fundedToDate: 0, originalAmount: 100000 },
        ],
    };

    render = () => {
        return <span>output here</span>;
    };
}

export default Budget;
