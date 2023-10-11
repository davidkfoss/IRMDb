import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  const handleSearch = () => {
    onSearch(searchInput);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search for movies...'
        value={searchInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
