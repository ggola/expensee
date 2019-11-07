// Returns array of expenditures filtered according 
const getFilteredExpenditures = (loadedExpenditures, searchQuery) => {
    let filteredExpenditures = [];

    const searchQueryArray = searchQuery.split(" ");
    if (searchQueryArray.length === 1) {
        // Single query
        // Filter with searchQuery
        if (isNaN(searchQuery)) {
            if (searchQuery.toUpperCase() === 'EUR' || searchQuery.toUpperCase() === 'GBP' || searchQuery.toUpperCase() === 'DKK') {

                // Search for currencies tickers
                filteredExpenditures = loadedExpenditures.filter(exp => exp.currency === searchQuery.toUpperCase());
            } else {
                // Search for name or emails
                filteredExpenditures = loadedExpenditures.filter(exp => String(exp.name.toLowerCase()).includes(searchQuery.toLowerCase()) || String(exp.email.toLowerCase()).includes(searchQuery.toLowerCase()));
            }
        } else {
            // Search for amount
            filteredExpenditures = loadedExpenditures.filter(exp => parseFloat(exp.amount) >= parseFloat(searchQuery));
        }
    } else {
        const queryAmount = searchQueryArray[0];
        const queryCurrency = searchQueryArray[1];
        // Filter by currency
        filteredExpenditures = loadedExpenditures.filter(exp => exp.currency === queryCurrency.toUpperCase());
        // Filter by amount
        filteredExpenditures = filteredExpenditures.filter(exp => parseFloat(exp.amount) >= parseFloat(queryAmount));
    }
    return filteredExpenditures
};

export default getFilteredExpenditures;