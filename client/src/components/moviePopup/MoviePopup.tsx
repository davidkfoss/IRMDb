import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import { Movie } from '../../models/movie';
import './MoviePopup.css';

interface MoviePopupProps {
  movie: Movie;
  onClose: () => void;
}

export const MoviePopup = ({ movie, onClose }: MoviePopupProps) => {
  const consumeEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const catchFocus = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        e.preventDefault();

        const close = document.getElementById('close');
        close?.focus();
      }
      e.stopPropagation();
    };

    window.addEventListener('keydown', catchFocus);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', catchFocus);
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <dialog className='movie-popup' onClick={onClose} role='dialog' aria-modal='true' data-testid='movie-popup'>
      <div className='movie-popup-image-container'>
        <IconButton
          sx={{ position: 'absolute' }}
          size='large'
          color='warning'
          id='close'
          onClick={onClose}
          data-testid='close-button'
        >
          <CloseIcon fontSize='large' />
        </IconButton>
        <img
          src={movie.posterUrl}
          className='movie-info-image-popup'
          onClick={consumeEvent}
          alt={`Poster for ${movie.title}`}
        />
      </div>
    </dialog>
  );
};
