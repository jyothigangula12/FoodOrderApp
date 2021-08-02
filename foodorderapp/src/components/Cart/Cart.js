import React,{ useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context"; 
import CartItem from "./CartItem";
import CheckOutForm from "./CheckOutForm";
const Cart = (props) => {
  const [sendOrder , setSendOrder] = useState(false)
  const [didSendOrder, setDidSendOrder] = useState(false)
  const [isCheckOut, setIsCheckOut] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    console.log(id);
    cartCtx.removeItem(id);
  };
  const OrderHandler = () => {
    setIsCheckOut(true);
  };
  const cartItemAddHandler = (item, totalnumber) => {
    console.log(item.totalnumber, totalnumber, cartCtx);
    cartCtx.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      totalnumber: item.totalnumber,
    });
  };
  const addInputData = (inputData) => {
    setSendOrder(true)
    const response = fetch(
      "https://react-http-cbdbb-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: inputData, orderdItems: cartCtx.items }),
      }
    );
    setSendOrder(false)
    setDidSendOrder(true)
    cartCtx.clearCart()
  };
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes[`button--alt`]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={OrderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartItems = (
    <ul className={classes[`cart-items`]}>
      {cartCtx.items.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          name={item.name}
          totalnumber={item.totalnumber}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const cartModalContent = <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOutForm onCancel={props.onHideCart} InputData={addInputData} />
      )}
      {!isCheckOut && modalActions}
  </React.Fragment>
  const isSubmittingOrder =  <p>Sending Order Data....</p>
  const didSubmitOrder = <React.Fragment><p>Successfully Sent Order!</p><div className={classes.actions}>
  <button className={classes.button} onClick={props.onHideCart}>
    Close
  </button></div></React.Fragment>
  return (
    <Modal onClose={props.onHideCart}>
     { !sendOrder && !didSendOrder&& cartModalContent}
     {sendOrder && isSubmittingOrder}
     {didSendOrder && !sendOrder && didSubmitOrder}
    </Modal>
  );

};
export default Cart;
