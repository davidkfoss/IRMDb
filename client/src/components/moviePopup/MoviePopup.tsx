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
  // Define a function that stops the propagation of an event
  const consumeEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  // Add an event listener to the window to catch keyboard events
  useEffect(() => {
    const catchFocus = (e: KeyboardEvent) => {
      // If the user presses the escape key, close the popup
      if (e.key === 'Escape') {
        onClose();
      }
      // If the user presses the tab key, focus on the close button
      else if (e.key === 'Tab') {
        e.preventDefault();

        const close = document.getElementById('close');
        close?.focus();
      }
      // Stop the propagation of the event
      e.stopPropagation();
    };

    window.addEventListener('keydown', catchFocus);
    // Disable scrolling on the body element
    document.body.style.overflow = 'hidden';

    // Remove the event listener and re-enable scrolling when the component unmounts
    return () => {
      window.removeEventListener('keydown', catchFocus);
      document.body.style.overflow = 'auto';
    };
  });

  return (
    <dialog className='movie-popup' onClick={onClose} role='dialog' aria-modal='true'>
      <div className='movie-popup-image-container'>
        <IconButton sx={{ position: 'absolute' }} size='large' color='warning' id='close' onClick={onClose}>
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
