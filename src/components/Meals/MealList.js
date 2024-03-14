import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./MealList.module.css";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Salad with grilled vegetables",
    description:
      "EGGPLANTS, ZUCCHINI, MUSHROOMS, BELL PEPPER, BAKED ON A GRILL, FRESH TOMATOES, CILANTRO, OIL",
    price: 11.99,
  },
  {
    id: "m2",
    name: "Khinkali (mutton)",
    description: "MUTTON WITH GEORGIAN SPICES AND GREENS",
    price: 3.99,
  },
  {
    id: "m3",
    name: "Royal khachapuri",
    description: "KHACHAPURI STUFFED WITH BRYNZA CHEESE AND SULUGUNI",
    price: 4.99,
  },
  {
    id: "m4",
    name: "Tbilisuri",
    description:
      "STEWED BEEF WITH MUSHROOMS WITH CHEESE SULUGUNI AND SOUR CREAM BAKED IN SIMMERING CLAY PLATE",
    price: 7.99,
  },
];

const MealList = () => {
  const mealList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default MealList;
