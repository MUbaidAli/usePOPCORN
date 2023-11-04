import Search from "./Search";

function Navbar({ query, setQuery }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <Search query={query} setQuery={setQuery} />
      <p className="num-results">
        Found <strong>0</strong> results
      </p>
    </nav>
  );
}

export default Navbar;
