import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-content";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartContex = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContex.totalAmount).toFixed(2)}`;

  const hasItems = cartContex.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContex.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContex.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContex.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Overall</span>
        <span>{totalAmount}</span>
      </div>

      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          close
        </button>
        {hasItems && <button className={styles.button}>order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
