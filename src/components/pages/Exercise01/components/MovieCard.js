import "../assets/styles.css";

const MovieCard = ({ movie, addToCart }) => {
  const { id, name, price } = movie;
  return (
    <li className="movies__list-card">
      <ul>
        <li>ID: {id}</li>
        <li>Name: {name}</li>
        <li>Price: ${price}</li>
      </ul>
      <button onClick={() => addToCart(movie)}>Add to cart</button>
    </li>
  );
};

export default MovieCard;
