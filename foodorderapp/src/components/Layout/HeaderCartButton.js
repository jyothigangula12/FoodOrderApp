import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnHighlited, setBtnHighlited] = useState(false);
  const cartCtx = useContext(CartContext);
  const items = cartCtx.items;
  const numberOfCartContext = items.reduce((curNum, item) => {
    return curNum + item.totalnumber;
  }, 0);
  const btnClasses = `${classes.button} ${btnHighlited ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlited(true);
    const timer = setTimeout(() => {
      setBtnHighlited(false);
    }, 300);
    
    return () =>{
        clearTimeout(timer)
    }
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onVisibleCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartContext}</span>
    </button>
  );
};
export default HeaderCartButton;
