import React,{Fragment} from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'
const Header =(props) =>{
  return <Fragment>
      <header className={classes.header}>
          <h1 >ReactMeals</h1>
          <HeaderCartButton onVisibleCart={props.onShowCart} />
      </header>
      <div className = {classes['mainimage']}>
          <img src={mealsImage} alt='A table full of delicious food'></img>
      </div>
  </Fragment>
}
export default Header;