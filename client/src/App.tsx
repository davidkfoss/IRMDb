import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { MovieInfo } from './pages/movieInfo/MovieInfo';
import { Movies } from './pages/movies/Movies';
import { Feed } from './pages/feed/Feed';
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
            element: <Feed />,
          },
          {
            path: 'movies',
            element: <Movies />,
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
