import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-content";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";
import React from "react";

const Cart = (props) => {
  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);
  const [isDataSubmitting, setIsDataSubmitting] = useState(false);
  const [wasDataSendingSuccessful, setWasDataSendingSuccessful] =
    useState(false);

  const cartContex = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContex.totalAmount).toFixed(2)}`;

  const hasItems = cartContex.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContex.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContex.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsSubmitOrderAvailable(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsDataSubmitting(true);
    await fetch(
      "https://react-learn-e675d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartContex.items,
        }),
      }
    );
    setIsDataSubmitting(false);
    setWasDataSendingSuccessful(true);
    cartContex.clearCart();
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

  const modalButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseCart}>
        close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Overall</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmitOrderAvailable && (
        <SubmitOrder
          onSubmit={submitOrderHandler}
          onCancel={props.onCloseCart}
        />
      )}
      {!isSubmitOrderAvailable && modalButtons}
    </React.Fragment>
  );

  const dataSubmittingCartModalContent = <p>Sending Data...</p>;
  const dataWasSubmittedCartModalContent = (
    <React.Fragment>
      <p>Your order was sent</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCloseCart}>
          close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isDataSubmitting && !wasDataSendingSuccessful && cartModalContent}
      {isDataSubmitting && dataSubmittingCartModalContent}
      {wasDataSendingSuccessful && dataWasSubmittedCartModalContent}
    </Modal>
  );
};

export default Cart;
