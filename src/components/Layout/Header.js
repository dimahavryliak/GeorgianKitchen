import React from "react";
import foodImage from "../../assets/foods.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Georgian Cuisine</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={foodImage} alt="Japan Cuisine Meals"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
