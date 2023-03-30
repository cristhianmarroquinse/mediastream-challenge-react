/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "../assets/styles.css";
import { useEffect, useState } from "react";
import { movies, discountRules, cartInitialState } from "../data";
import MovieCard from "./MovieCard";
import CartItem from "./CartItem";

const MovieStore = () => {
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cart, setCart] = useState(cartInitialState);

  useEffect(() => {
    const cartIds = cart.map((item) => item.id).sort((a, b) => a - b);
    const sortedDiscountRules = discountRules.map((rule) => {
      return { ...rule, ...{ m: rule.m.sort((a, b) => a - b) } };
    });
    const discountRuleToApply = sortedDiscountRules.find((rule) =>
      compareIntArray(rule.m, cartIds)
    );
    const finalDiscount = discountRuleToApply?.discount || 0;
    setDiscount(finalDiscount);

    const cartSum = cart.reduce((previous, current) => {
      return previous + current.price * current.quantity;
    }, 0);

    setTotal(cartSum - cartSum * finalDiscount);
  }, [cart]);

  const removeCartItem = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
  };

  const changeCartQty = (id, qty) => {
    const currentItem = cart.find((item) => item.id === id);
    if (currentItem.quantity === 1 && qty < 0) {
      removeCartItem(id);
    } else {
      setCart(
        cart.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + qty,
            };
          }
          return item;
        })
      );
    }
  };

  const addToCart = (movie) => {
    const { id } = movie;
    const currentMovie = cart.find((m) => m.id === id);

    if (currentMovie) {
      changeCartQty(id, 1);
    } else {
      setCart([...cart, ...[{ ...movie, quantity: 1 }]]);
    }
  };

  const compareIntArray = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} addToCart={addToCart} />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map((movie) => (
            <CartItem
              key={movie.id}
              movie={movie}
              changeCartQty={changeCartQty}
            />
          ))}
        </ul>
        <div className="movies__cart-total">
          <p>Total: ${total}</p>
          {!!discount && <p>Discount applied: {discount * 100}%</p>}
        </div>
      </div>
    </section>
  );
};

export default MovieStore;
