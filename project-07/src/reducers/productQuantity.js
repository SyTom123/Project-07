const ProductQuantity = (state = 1, action) => {
    switch (action.type) {
        case "DOWN":
            return state -= action.value;
        case "UP":
            return state += action.value;
        case "RESET":
            return 1;
        default:
            return state;
    }
}
export default ProductQuantity;