import "../assets/styles.css";

const MovieDetailsCard = ({ movie }) => {
  const { posterUrl, title, year, genres } = movie;
  return (
    <div className="movie-library__card">
      <img src={posterUrl} alt={title} />
      <div className="movie-library__card-gradient">
        <div className="movie-library__card-details">
          <p className="movie-library__card-details-title">Title: {title}</p>
          <p>{genres.join(", ")}</p>
          <p>{year}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
