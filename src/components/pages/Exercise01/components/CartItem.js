import "../assets/styles.css";

const CartItem = ({ movie, changeCartQty }) => {
  const { id, name, price, quantity } = movie;
  return (
    <li className="movies__cart-card">
      <ul>
        <li>ID: {id}</li>
        <li>Name: {name}</li>
        <li>Price: ${price}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => changeCartQty(id, -1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => changeCartQty(id, 1)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
