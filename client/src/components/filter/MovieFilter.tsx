import { useEffect, useState } from 'react';
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

  const handleChange: FilterChangeHandler = (event) => {
    const { target } = event;
    const { name, value, checked } = target;

    if (checked !== undefined) {
      setFilters((prev) => {
        return { ...prev, [name]: checked ? directions[0] : directions[1] };
      });
    } else {
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

  useEffect(() => {
    if (hasFiltersChanged(filters, storeFilters)) {
      onChange(filters);
    }

    return () => {
      setFiltersInSessionStorage(filters);
    };
  }, [filters, onChange, storeFilters]);

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
