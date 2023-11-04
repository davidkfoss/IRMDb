import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
import { FilterChangeHandler } from '../MovieFilter';
import { Direction } from './direction';

interface AscDescProps {
  value: Direction;
  onChange: FilterChangeHandler;
  name: string;
}

export const AscDesc = ({ value, onChange, name }: AscDescProps) => {
  const isAsc = value == 'asc';

  return (
    <FormControl component='fieldset' sx={{ m: 1 }}>
      <FormControlLabel
        control={
          <Checkbox
            aria-label='sort direction'
            sx={{ color: 'white !important' }}
            checked={isAsc}
            name={name}
            onChange={onChange}
            inputProps={{ 'aria-label': 'controlled' }}
            icon={<ArrowDownwardIcon fontSize='large' />}
            checkedIcon={<ArrowUpwardIcon fontSize='large' />}
          />
        }
        label='Sort order'
        labelPlacement='top'
      />
    </FormControl>
  );
};
