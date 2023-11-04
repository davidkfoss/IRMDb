import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (search: string) => void;
  initialValue?: string;
  width?: number | string;
}

const SearchBar = ({ onSearch, initialValue, width = 350 }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState(initialValue || '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(searchInput);
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl
      component='form'
      sx={{ m: 1, width: width, backgroundColor: '#333333', borderRadius: '20px' }}
      variant='filled'
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(searchInput);
      }}
    >
      <InputLabel htmlFor='search-input' sx={{ color: 'grey' }}>
        Search
      </InputLabel>
      <OutlinedInput
        id='search-input'
        type='text'
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        defaultValue={initialValue}
        sx={{ color: 'white', borderRadius: '20px', lineHeight: 1 }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              sx={{ color: grey[200] }}
              aria-label='search for movie'
              onMouseDown={handleMouseDown}
              type='submit'
              size='large'
              edge='end'
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label='Search'
        aria-label='Search for movies'
      />
    </FormControl>
  );
};

export default SearchBar;
