// Returns array of expenditures filtered according 
const getFilteredExpenditures = (loadedExpenditures, searchQuery) => {
    let filteredExpenditures = [];

    console.log(searchQuery);
    
    if (searchQuery == null || searchQuery === "") {
        return filteredExpenditures; // empty
    }

    const searchQueryArray = searchQuery.split(" ");
    if (searchQueryArray.length === 1) {
        // User has searched for currency or name or alphabeth letter
        // Filter with searchQuery
        if (isNaN(searchQuery)) {
            if (searchQuery.length === 1) {
                // User has searched for all last names starting with the searched letter
                filteredExpenditures = loadedExpenditures.filter(exp => {
                    const nameArray = exp.name.split(" ");  // nameArray[1] is last name
                    return String(nameArray[1].charAt(0).toLowerCase()) === searchQuery.toLowerCase()
                });
            } else {
                // User has entered either a currency or some initials of name or email
                if (searchQuery.toUpperCase() === 'EUR' || searchQuery.toUpperCase() === 'GBP' || searchQuery.toUpperCase() === 'DKK') {
                    // Search for currencies tickers
                    filteredExpenditures = loadedExpenditures.filter(exp => exp.currency === searchQuery.toUpperCase());
                } else {
                    // Search for name or emails
                    filteredExpenditures = loadedExpenditures.filter(exp => String(exp.name.toLowerCase()).includes(searchQuery.toLowerCase()) || String(exp.email.toLowerCase()).includes(searchQuery.toLowerCase()));
                }
            }
        } else {
            // User has entered a number alone (not valid search)
            return filteredExpenditures; // empty
        }
    } else {
        // Search query is of type 2000 GBP
        const queryAmount = searchQueryArray[0];
        if (isNaN(queryAmount)) {
            // First parameter is not a number
            return filteredExpenditures; // Empty
        }
        const queryCurrency = searchQueryArray[1];
        if (queryCurrency.toUpperCase() !== 'EUR' && queryCurrency.toUpperCase() !== 'GBP' && queryCurrency.toUpperCase() !== 'DKK') {
            // Second parameter is not a valid currency
            return filteredExpenditures; // Empty
        }
        // If we have survived the validation: filter by currency and amount
        filteredExpenditures = loadedExpenditures.filter(exp => exp.currency === queryCurrency.toUpperCase());
        filteredExpenditures = filteredExpenditures.filter(exp => parseFloat(exp.amount) >= parseFloat(queryAmount));

    }
    return filteredExpenditures
};

export default getFilteredExpenditures;