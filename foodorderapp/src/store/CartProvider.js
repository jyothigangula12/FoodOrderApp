import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  console.log(action)
  if (action.type === "ADD_CART_ITEM") {
    const updatedTotalAmount =
    state.totalAmount + action.item.price * action.item.totalnumber;

    const existedIndex= state.items.findIndex((item) => item.id === action.item.id)
    const existedItem = state.items[existedIndex]
     let updatedItems;
    if(existedItem){
      console.log(action.item.totalnumber , existedItem.totalnumber)
    const updatedItem = {...existedItem,
    totalnumber : 1 + existedItem.totalnumber}//Before it was action.item.totalnumber , existedItem.totalnumber
    updatedItems = [...state.items]
    updatedItems[existedIndex] = updatedItem
    }
    else {
        updatedItems = state.items.concat(action.item)
    }
    
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  else if (action.type === "DELETE_CART_ITEM") {
    const existedIndex= state.items.findIndex((item) => item.id === action.id)
    const existedItem = state.items[existedIndex]
    const updatedTotalAmount = state.totalAmount - existedItem.price
    
    let updatedItems;
    if( existedItem.totalnumber === 1){
    updatedItems = state.items.filter(item => item.id !== action.id)
    console.log(updatedItems)
    }
    else {
      let count = existedItem.totalnumber - 1
      const updatedItem = {...existedItem,
        totalnumber : existedItem.totalnumber -1}
        updatedItems = [...state.items]
        updatedItems[existedIndex] = updatedItem

    } 
    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
  } 
  else if (action.type === "CLEAR_CART_ITEM") {
    return defaultCartState
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };
  const deleteItemToCartHandler = (id) => {
    dispatchCartAction({ type: "DELETE_CART_ITEM", id: id });
  };
  const clearCartItemHandler = () => {
    dispatchCartAction({type: "CLEAR_CART_ITEM"})
  }
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: deleteItemToCartHandler,
    clearCart: clearCartItemHandler
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
