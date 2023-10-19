import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (search: string) => void;
  initialValue?: string;
}

const SearchBar = ({ onSearch, initialValue }: SearchBarProps) => {
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
    <FormControl sx={{ m: 1, width: '350px', backgroundColor: '#333333', borderRadius: '20px' }} variant='filled'>
      <InputLabel htmlFor='outlined-adornment-search' sx={{ color: 'grey' }}>
        Search
      </InputLabel>
      <OutlinedInput
        id='outlined-adornment-search'
        type='text'
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        defaultValue={initialValue}
        sx={{ color: 'white' }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              sx={{ color: grey[200] }}
              aria-label='search for movie'
              onMouseDown={handleMouseDown}
              onClick={() => onSearch(searchInput)}
              size='large'
              edge='end'
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label='Search'
      />
    </FormControl>
  );
};

export default SearchBar;
