import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { MovieGrid } from './components/movieGrid/MovieGrid';
import { mockMovies } from './data/mockMovies';
import { MovieInfo } from './pages/movieInfo/MovieInfo';
import { Root } from './pages/root/Root';
import { store } from './store/store';

function App() {
  const basename = import.meta.env.PROD ? '/project2' : undefined;

  const router = createBrowserRouter(
    [
      {
        element: <Root />,
        errorElement: <h1>404 Not found!</h1>,
        path: '/',
        children: [
          {
            index: true,
            element: <h1>Home</h1>,
          },
          {
            path: 'movies',
            element: <MovieGrid movies={mockMovies} />,
          },
          {
            path: 'movies/:id',
            element: <MovieInfo />,
          },
          {
            path: '*',
            element: <h1>404 Not found!</h1>,
          },
        ],
      },
    ],
    { basename }
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
