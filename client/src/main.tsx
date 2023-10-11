import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initialFilters } from './components/filter/filterUtil.ts';
import './index.css';
import { getFilteredMovies } from './store/features/movies/movieThunks.ts';
import { store } from './store/store.ts';

store.dispatch(getFilteredMovies({ filters: initialFilters, initial: true }));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
