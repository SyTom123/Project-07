let initialState = [];

const CartReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case "ADD":
      const options = {
        quantity: action.quantity,
        value: action.value,
        id: action.id,
      };
      newState.push(options);
      return newState;

    case "UPDATE_0":
      const pro = newState.find((item) => item.id === action.id);
      pro.quantity = action.quantity;
      return newState;

    case "UPDATE":
      const product = newState.find((item) => item.id === action.id);
      product.quantity += action.quantity;
      return newState;

    case "DELETE":
      const indexItemDelete = newState.findIndex(
        (item) => item.id === action.id
      );
      newState.splice(indexItemDelete, 1);
      return newState;

    case "DELETE_ALL":
      return [];
    default:
      return state;
  }
};
export default CartReducer;
