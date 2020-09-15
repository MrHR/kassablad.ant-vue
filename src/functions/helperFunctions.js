export default {
  // MATH FUNCTIONS
  calculatePrice: (amount, price) => {
    return Math.round((price * amount) * 100 / 100)
  },
  sumPrices: (price, priceTwo) => {
    return (price * 100 + priceTwo * 100) / 100
  },
  subtractPrices: (price, priceTwo) => {
    return (price * 100 - priceTwo * 100) / 100
  },

  // UI FUNCTIONS
  setFocus (refs, ref) {
    setTimeout(() => {
      if (refs[ref]) {
        refs[ref].$el.focus() || refs[ref].focus()
      }
    }, 10)
  }
}
