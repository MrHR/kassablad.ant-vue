// import { forEach } from "core-js/fn/array"

export default {
  // MATH FUNCTIONS
  calculatePrice: (amount, price) => {
    return Math.round((price * amount) * 100 / 100)
  },
  calculatePriceNoRound: (amount, price) => {
    return ((price * 100) * amount) / 100
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
  },
  setMenuItem (id) {
    document.querySelector('li.ant-menu-item-selected')
      .classList.remove('ant-menu-item-selected')
    document.getElementById(`${id}`)
      .classList.add('ant-menu-item-selected')
  }
}
