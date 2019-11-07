export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_RECEIPT = 'ADD_RECEIPT';
export const GET_EXPENDITURES = 'GET_EXPENDITURES';
export const GET_EXPENDITURE_FROM_ID = 'GET_EXPENDITURE_FROM_ID';

// Models
import Expenditure from '../../models/expenditure';

import ENV from '../../env';
import DateFormat from '../../constants/DateFormat';
import Filtering from '../../helpers/Filtering';

// Action: ADD RECEIPT
export const addReceipt = (expenditureId, expenditureIndex, imageFile) => {
    return async dispatch => {
        try {
            const data = new FormData();
            data.append('receipt', {
                uri: imageFile.uri,
                type: 'image/jpeg',
                name: 'receipt'
            });

            const response = await fetch(`${ENV.baseUrl}/expenses/${expenditureId}/receipts`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: data
            });

            if (!response.ok) {
                throw new Error('Problems updating receipt')
            }

            if (response) {
                const resData = await response.json();

                const updatedExpenditure = new Expenditure(
                    id = resData.id,
                    index = expenditureIndex,
                    amount = resData.amount.value,
                    currency = resData.amount.currency,
                    name = resData.user.first + ' ' + resData.user.last,
                    email = resData.user.email,
                    date = new Date(resData.date).toLocaleString("en-US", DateFormat),
                    retail = resData.merchant,
                    comment = resData.comment,
                    receipts = resData.receipts,
                )

                dispatch({
                    type: ADD_RECEIPT,
                    updatedExpenditure: updatedExpenditure
                });

            } 
        } catch (err) {
            throw new Error('Cannot access expenses');
        }
    }
};

// Action: ADD COMMENT
export const addComment = (expenditureId, expenditureIndex, comment) => {
    return async dispatch => {
        try {
            const response = await fetch(`${ENV.baseUrl}/expenses/${expenditureId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({    
                    comment: comment
                })
            });

            if (!response.ok) {
                throw new Error('Problems updating comment')
            }

            if (response) {
                const resData = await response.json();

                const updatedExpenditure = new Expenditure(
                    id = resData.id,
                    index = expenditureIndex,
                    amount = resData.amount.value,
                    currency = resData.amount.currency,
                    name = resData.user.first + ' ' + resData.user.last,
                    email = resData.user.email,
                    date = new Date(resData.date).toLocaleString("en-US", DateFormat),
                    retail = resData.merchant,
                    comment = resData.comment,
                    receipts = resData.receipts,
                )

                dispatch({
                    type: ADD_COMMENT,
                    updatedExpenditure: updatedExpenditure
                });

            } 
        } catch (err) {
            throw new Error('Cannot access expenses');
        }
    }
};

// Action: GET EXPENDITURES
export const getExpenditures = (limit, offset, searchQuery) => {
    return async dispatch => {     
        try {
            const response = await fetch(`${ENV.baseUrl}/expenses?limit=${limit}&offset=${offset}`);

            if (!response.ok) {
                throw new Error('Problems loading expenditures')
            }

            if (response) {
                const resData = await response.json();
                
                const totalExpenditures = resData.total;

                const loadedExpenditures = [];
                for (var i = 0; i < resData.expenses.length; i++) {
                    loadedExpenditures.push(new Expenditure(
                        id = resData.expenses[i].id,
                        index = resData.expenses[i].index + 1,
                        amount = resData.expenses[i].amount.value,
                        currency = resData.expenses[i].amount.currency,
                        name = resData.expenses[i].user.first + ' ' + resData.expenses[i].user.last,
                        email = resData.expenses[i].user.email,
                        date = new Date(resData.expenses[i].date).toLocaleString("en-US", DateFormat),
                        retail = resData.expenses[i].merchant,
                        comment = resData.expenses[i].comment,
                        receipts = resData.expenses[i].receipts,
                    ))
                }

                let filteredExpenditures = [];
                if (searchQuery) {
                    filteredExpenditures = Filtering(loadedExpenditures, searchQuery);
                }
                
                dispatch({
                    type: GET_EXPENDITURES,
                    totalExpenditures: totalExpenditures,
                    expenditures: searchQuery ? filteredExpenditures : loadedExpenditures
                });

            } 
        } catch (err) {
            throw new Error('Cannot access expenses');
        }
    }
}

// Action: GET EXPENDITURES
export const getExpenditureFromId = (expenditureId) => {
    return async dispatch => {
        try {
            const response = await fetch(`${ENV.baseUrl}/expenses/${expenditureId}`);

            if (response.status === 404) {
                throw new Error('Expense not found')
            }

            if (response) {
                const resData = await response.json();
                const currentExpenditure = new Expenditure(
                        id = resData.id,
                        index = resData.index + 1,
                        amount = resData.amount.value,
                        currency = resData.amount.currency,
                        name = resData.user.first + ' ' + resData.user.last,
                        email = resData.user.email,
                        date = new Date(resData.date).toLocaleString("en-US", DateFormat),
                        retail = resData.merchant,
                        comment = resData.comment,
                        receipts = resData.receipts,
                    )

                dispatch({
                    type: GET_EXPENDITURE_FROM_ID,
                    currentExpenditure: currentExpenditure
                });

            }
        } catch (err) {
            throw new Error('Expense not found');
        }
    }
}