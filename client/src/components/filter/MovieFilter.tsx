import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { useWindowSize } from '@uidotdev/usehooks';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilters } from '../../store/features/movies/moviesSlice.ts';
import SearchBar from '../searchBar/SearchBar.tsx';
import './MovieFilter.css';
import { AscDesc } from './ascDesc/AscDesc';
import { directions } from './ascDesc/direction';
import { Filters, getFiltersFromSessionStorage, hasFiltersChanged, setFiltersInSessionStorage } from './filterUtil.ts';
import { GenreSelect } from './genreSelect/GenreSelect';
import { SortBy } from './sortBy/SortBy';

export interface ChangeEvent {
  target: {
    name: string;
    value: unknown;
    checked?: boolean;
  };
}

export type FilterChangeHandler = (event: ChangeEvent) => void;

interface FilterProps {
  onChange: (filters: Filters) => void;
}

export const MovieFilter = ({ onChange }: FilterProps) => {
  const [filters, setFilters] = useState(getFiltersFromSessionStorage);
  const storeFilters = useSelector(selectFilters);
  const { width } = useWindowSize();

  const handleChange: FilterChangeHandler = (event) => {
    const { target } = event;
    const { name, value, checked } = target;

    // If the checkbox is checked, set the direction to ascending, otherwise set it to descending
    if (checked !== undefined) {
      setFilters((prev) => {
        return { ...prev, [name]: checked ? directions[0] : directions[1] };
      });
    } else {
      // Otherwise, set the filter to the new value
      setFilters((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleSearch = (search: string) => {
    setFilters((prev) => {
      return { ...prev, search };
    });
  };

  // Using useEffect to check if the filters have changed and call the onChange function if they have
  useEffect(() => {
    if (hasFiltersChanged(filters, storeFilters)) {
      onChange(filters);
    }
    // Sets the filters in session storage when the component is unmounted
    return () => {
      setFiltersInSessionStorage(filters);
    };
  }, [filters, onChange, storeFilters]);

  const isMobile = useMemo(() => width && width < 1065, [width]);

  // If the window size is less than 1065 pixels, return the mobile filter view
  if (isMobile)
    return (
      <div className='filter-accordion-wrapper'>
        <Accordion sx={{ color: 'white', backgroundColor: 'rgb(58, 94, 110)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>Show filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='filter-container-mobile'>
              <SearchBar onSearch={handleSearch} width={'100%'} initialValue={filters.search} />
              <GenreSelect value={filters.genres} name='genres' width={'100%'} onChange={handleChange} />
              <div className='filters-container-mobile'>
                <SortBy value={filters.sortBy} name='sortBy' width={'100%'} onChange={handleChange} />
                <AscDesc value={filters.direction} name='direction' onChange={handleChange} />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    );

  // Otherwise, return the desktop filter view
  return (
    <div className='filter-container'>
      <div className='search-bar-container'>
        <SearchBar onSearch={handleSearch} initialValue={filters.search} />
      </div>
      <div className='filters-container'>
        <GenreSelect value={filters.genres} name='genres' onChange={handleChange} />
        <SortBy value={filters.sortBy} name='sortBy' onChange={handleChange} />
        <AscDesc value={filters.direction} name='direction' onChange={handleChange} />
      </div>
    </div>
  );
};
