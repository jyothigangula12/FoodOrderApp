import classes from './CartItem.module.css';
import  {useRef} from 'react'
const CartItem = (props) => {
 // const amountInputRef = useRef();
 // const price = `$${props.price.toFixed(2)}`

 const clickHandler = (totalnumber) =>{
  {props.onAdd(totalnumber)}
 }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>${props.price}</span>
          <span className={classes.amount} >{props.totalnumber}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={clickHandler.bind(null,props.totalnumber)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;