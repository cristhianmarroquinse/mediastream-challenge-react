import "../assets/styles.css";

const MovieFilter = ({
  selectedGenre,
  setSelectedGenre,
  genres,
  handleOrderChange,
  yearSorting,
}) => {
  return (
    <div className="movie-library__actions">
      <div className="movie-select-wrapper">
        <select
          name="genre"
          placeholder="Search by genre..."
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre) => (
            <option value={genre} key={genre}>{genre}</option>
          ))}
        </select>
        <button onClick={() => handleOrderChange()}>Year {yearSorting}</button>
      </div>
    </div>
  );
};

export default MovieFilter;
