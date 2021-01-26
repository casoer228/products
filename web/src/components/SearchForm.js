import { useState } from 'react';

const SearchForm = ({ search }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    search(query);
  };

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={handleInputChange}
      />
      <div className="input-group-append">
        <button type="submit" className="btn btn-primary">Пошук</button>
      </div>
    </form>
  );
};

export default SearchForm;
