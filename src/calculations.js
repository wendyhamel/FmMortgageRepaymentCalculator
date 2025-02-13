window.repayMortgageCalc = function() {
	return {
		showResults: false,
		showWarning: false,

		amount: Alpine.$persist(null),
		term: Alpine.$persist(null),
		rate: Alpine.$persist(null),
		mortgageTypes: [
			{id: 'repayment', name: 'Repayment'},
			{id: 'interest_only', name: 'Interest Only'}
		],
		selectedType: Alpine.$persist(null),
		monthlyRepayment: null,
		total: null,

		pickCalculationForMortgageType(amountNumber, interest) {

		},

		calculateInterest() {
			let amountAsNumber = Number(this.amount.replace(/,/g, ""))
			let termAsNumber = Number(this.term)
			let rateAsNumber = Number(this.rate)
			let ratePerMonth = Number(rateAsNumber / 100 / 12)
			let interestPerMonth = Number(ratePerMonth * amountAsNumber)
			let termInMonths = termAsNumber * 12
			if (this.selectedType === 'repayment') {
				this.monthlyRepayment = Number(interestPerMonth / (1 - Math.pow((1 + ratePerMonth),(-termAsNumber * 12)))).toFixed(2)
			}
			else if ( this.selectedType === 'interest_only') {
				this.monthlyRepayment = Number(interestPerMonth).toFixed(2)
			}
			this.total = Number( Number(this.monthlyRepayment) * termInMonths).toFixed(2)
			this.showWarning = this.selectedType === 'interest_only' ? true : false
			this.showResults = true
		},

		clearAllFields() {
			this.amount = null
			this.term = null
			this.rate = null
			this.selectedType = null
			this.monthlyRepayment = null
			this.total= null
			this.showResults = false
		}
	}
}