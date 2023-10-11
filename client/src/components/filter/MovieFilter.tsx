import { useEffect, useState } from 'react';
import './MovieFilter.css';
import { AscDesc } from './ascDesc/AscDesc';
import { directions } from './ascDesc/direction';
import { Filters, initialFilters } from './filterUtil.ts';
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
  const [filters, setFilters] = useState(initialFilters);

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

  useEffect(() => {
    console.log('filters changed', filters);
    onChange(filters);
  }, [filters, onChange]);

  return (
    <div className='filter-container'>
      <GenreSelect value={filters.genres} name='genres' onChange={handleChange} />
      <SortBy value={filters.sortBy} name='sortBy' onChange={handleChange} />
      <AscDesc value={filters.direction} name='direction' onChange={handleChange} />
    </div>
  );
};
