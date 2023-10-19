import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FilterChangeHandler } from '../filterUtil';
import { SortOption, sortOptions } from './sortOptions';

interface SortByProps {
  value: SortOption;
  onChange: FilterChangeHandler;
  name: string;
}

export const SortBy = ({ value, onChange, name }: SortByProps) => {
  return (
    <FormControl sx={{ m: 1, width: 150, backgroundColor: '#333333', borderRadius: '10px' }} variant='filled'>
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
