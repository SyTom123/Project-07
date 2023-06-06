const newPrice = (item)=> {
    const priceNew =( item.price* ((100 - item.discountPercentage)/ 100)).toFixed(2);
    return priceNew;
}
export default newPrice;