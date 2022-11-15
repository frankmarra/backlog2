const Search = ({ onSubmit, onChange, value }) => {
  return (
    <form className="game-search" onSubmit={onSubmit}>
      <input
        type="text"
        id="search"
        value={value}
        placeholder="Search Games"
        onChange={onChange}
      />
      <button className="game-search-button" type="submit">
        Submit
      </button>
    </form>
  )
}

export default Search
