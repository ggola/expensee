import { ADD_COMMENT, ADD_RECEIPT, GET_EXPENDITURES, GET_EXPENDITURE_FROM_ID } from '../actions/expenditures';

// Set initial state
const initialState = {
    totalExpenditures: 0,
    expenditures: [],
    currentExpenditure: null
};

const expendituresReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_EXPENDITURES: {
            return {
                ...state,
                totalExpenditures: action.totalExpenditures,
                expenditures: action.expenditures
            }
        };
        case ADD_COMMENT: {
            const previousExpendituresComment = state.expenditures.filter(exp => exp.id !== action.updatedExpenditure.id);
            return {
                ...state,
                expenditures: [action.updatedExpenditure, ...previousExpendituresComment],
                currentExpenditure: action.updatedExpenditure
            }
        }
        case ADD_RECEIPT: {
            const previousExpendituresReceipt = state.expenditures.filter(exp => exp.id !== action.updatedExpenditure.id);
            return {
                ...state,
                expenditures: [action.updatedExpenditure, ...previousExpendituresReceipt],
                currentExpenditure: action.updatedExpenditure
            }
        }
        case GET_EXPENDITURE_FROM_ID: {
            return {
                ...state,
                currentExpenditure: action.currentExpenditure
            }
        }
        default:
            return state;
    };
};

export default expendituresReducer;