export default {
  calculatePrice: (amount, price) => {
    return ((price * 100) * amount) / 100
  },
  sumPrices: (price, priceTwo) => {
    return (price * 100 + priceTwo * 100) / 100
  },
  subtractPrices: (price, priceTwo) => {
    return (price * 100 - priceTwo * 100) / 100
  }
}
