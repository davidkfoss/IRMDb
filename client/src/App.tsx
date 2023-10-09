import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { MovieGrid } from './components/movieGrid/MovieGrid';
import { mockMovies } from './data/mockMovies';
import { Root } from './pages/root/Root';

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
            path: 'test',
            element: <MovieGrid movies={mockMovies} />,
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

  return <RouterProvider router={router} />;
}

export default App;
