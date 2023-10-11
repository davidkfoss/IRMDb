import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { FilterChangeHandler } from '../MovieFilter';
import { Genre, genres } from './genre';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface GenreSelectProps {
  value: Genre[];
  onChange: FilterChangeHandler;
  name: string;
}

export const GenreSelect = ({ value, onChange, name }: GenreSelectProps) => {
  return (
    <FormControl sx={{ m: 1, width: 250, backgroundColor: '#333333', borderRadius: '10px' }} variant='filled'>
      <InputLabel id='genre-checkbox-label' sx={{ color: '#aaaaaa' }}>
        Genre
      </InputLabel>
      <Select
        sx={{ color: 'white' }}
        labelId='genre-checkbox-label'
        id='genre-checkbox'
        name={name}
        multiple
        value={value}
        onChange={onChange}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}>
        {...genres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            <Checkbox checked={value.indexOf(genre) > -1} />
            <ListItemText primary={genre} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
