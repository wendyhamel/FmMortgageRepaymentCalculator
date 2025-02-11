window.repayMortgageCalc = function() {
	return {
		showResults: false,
		showWarning: false,

		amount: Alpine.$persist(null),
		term: Alpine.$persist(null),
		rate: Alpine.$persist(null),
		mortgageTypes: ['Repayment', 'InterestOnly'],
		selectedType: Alpine.$persist(null),
		monthlyRepayment: null,
		total: null,

		pickCalculationForMortgageType(amountNumber, interest) {
			let term = Number(this.term)
			let termInMonths = term * 12
			if (this.selectedType === 'Repayment') {
				this.monthlyRepayment = Number(((interest + amountNumber) / term) / 12).toFixed(2)
			}
			else if ( this.selectedType === 'InterestOnly') {
				this.monthlyRepayment = Number((interest / term) / 12).toFixed(2)
			}
		},

		calculateInterest() {
			let amountNumber = Number(this.amount.replace(/,/g, ""))
			let interest = Number((amountNumber / 100) * this.rate)
			this.pickCalculationForMortgageType(amountNumber, interest)
			this.total = Number(Number(amountNumber) + Number(interest)).toFixed(2)
			this.showWarning = this.selectedType === 'InterestOnly' ? true : false
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