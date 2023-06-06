import newPrice from "../newPrice";

const TotalMoney = (cart)=> {
    const total = cart
    .reduce((sum, item) => {
      const priceNew = newPrice(item.value[0]);
      sum += priceNew * item.quantity;
      return sum;
    }, 0)
    .toFixed(2);
    return total;
}
export default TotalMoney;