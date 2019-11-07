class Expenditure {
    constructor(id, index, amount, currency, name, email, date, retail, comment, receipts) {
        this.id = id;
        this.index = index;
        this.amount = amount;
        this.currency = currency;
        this.name = name;
        this.email = email;
        this.date = date;
        this.retail = retail;
        this.comment = comment;
        this.receipts = receipts;
    }
}

export default Expenditure;