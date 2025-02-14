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

		liveValidation: false,

		validation: {
			amount: {
				rule: {
					required: function(field) {
						if (field) {
							return { invalid: false, message: ''}
						} else {
							return { invalid: true, message: 'This field is required'}
						}
					}
				}
			},
			term: {
				rule: {
					required: function(field) {
						if (field) {
							return { invalid: false, message: ''}
						} else {
							return { invalid: true, message: 'This field is required'}
						}
					}
				}
			},
			rate: {
				rule: {
					required: function(field) {
						if (field) {
							return { invalid: false, message: ''}
						} else {
							return { invalid: true, message: 'This field is required'}
						}
					}
				}
			},
			selectedType: {
				rule: {
					required: function(field) {
						if (field) {
							return { invalid: false, message: ''}
						} else {
							return { invalid: true, message: 'This field is required'}
						}
					}
				}
			}
		},
		validate(field) {
			for (const key in this.validation[field].rule) {
				const validationResult = this.validation[field].rule[key](this[field])
				if (validationResult.invalid) {
					this.validation[field].invalid = true
					this.validation[field].message = validationResult.message
					break
				}
				this.validation[field].invalid = false
				this.validation[field].message = ''
			}
		},

		calculateInterest() {
			let amountAsNumber = Number(this.amount.replace(/,/g, ""))
			let termAsNumber = Number(this.term)
			let rateAsNumber = Number(this.rate)
			let ratePerMonth = Number(rateAsNumber / 100 / 12)
			let interestPerMonth = Number(ratePerMonth * amountAsNumber)
			let termInMonths = termAsNumber * 12
			let monthlyRepayment = Number(null)
			if (this.selectedType === 'repayment') {
				monthlyRepayment = Number(interestPerMonth / (1 - Math.pow((1 + ratePerMonth),(-termAsNumber * 12)))).toFixed(2)
			}
			else if ( this.selectedType === 'interest_only') {
				monthlyRepayment = Number(interestPerMonth).toFixed(2)
			}
			let total = Number( monthlyRepayment * termInMonths).toFixed(2)
			this.monthlyRepayment = new Intl.NumberFormat("gb-GB", {style: "currency", currency:"GBP"}).format(monthlyRepayment)
			this.total = new Intl.NumberFormat("gb-GB", {style: "currency", currency:"GBP"}).format(Number(total))
			this.showWarning = this.selectedType === 'interest_only'
			this.showResults = true
		},

		validateLive() {
			if (this.liveValidation) {
				this.validate('amount')
				this.validate('term')
				this.validate('rate')
				this.validate('selectedType')
			}
		},

		submit() {
			this.validate('amount')
			this.validate('term')
			this.validate('rate')
			this.validate('selectedType')
			this.liveValidation = true
			if (!this.validation.amount.invalid && !this.validation.term.invalid && !this.validation.rate.invalid) {
				this.calculateInterest()
			}
		},

		clearAllFields() {
			this.amount = null
			this.term = null
			this.rate = null
			this.selectedType = null
			this.monthlyRepayment = null
			this.total= null
			this.showResults = false
			this.liveValidation = false
			this.validation['amount'].message = ''
			this.validation['term'].message = ''
			this.validation['rate'].message = ''
			this.validation['selectedType'].message = ''
		}
	}
}