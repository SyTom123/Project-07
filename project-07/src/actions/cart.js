export const addCart = (id, item, quantity) => {
  return {
    type: "ADD",
    value: item,
    quantity: quantity,
    id: id,
  };
}; 
export const updateCart = (id, quantity, note) => {
  if( note === 0) {
    return {
      type: "UPDATE_0",
      id: id,
      quantity: quantity
    };
  }
  else {
    return {
      type: "UPDATE",
      id: id,
      quantity: quantity
    };
  }
}
export const deleteCart = (id) => {
  return {
    type: "DELETE",
    id: id,
  };
}; 
export const deleteAll = () => {
  return {
    type: "DELETE_ALL"
  };
};
