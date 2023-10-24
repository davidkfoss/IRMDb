import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FilterChangeHandler } from '../MovieFilter';
import { SortOption, sortOptions } from './sortOptions';
import { FilterChangeHandler } from '../MovieFilter';

interface SortByProps {
  value: SortOption;
  onChange: FilterChangeHandler;
  name: string;
  width?: number | string;
}

export const SortBy = ({ value, onChange, name, width = 150 }: SortByProps) => {
  return (
    <FormControl sx={{ m: 1, width: width, backgroundColor: '#333333', borderRadius: '10px' }} variant='filled'>
      <InputLabel id='sort-by-select-label' sx={{ color: '#aaaaaa' }}>
        Sort by
      </InputLabel>
      <Select
        sx={{ color: 'white' }}
        labelId='sort-by-select-label'
        id='sort-by-select'
        name={name}
        value={value}
        label='Sort by'
        onChange={onChange}
      >
        {...sortOptions.map((sortOption) => (
          <MenuItem key={sortOption} value={sortOption}>
            {sortOption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
