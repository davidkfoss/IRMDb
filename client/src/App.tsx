import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { client } from './client';
import { Auth } from './pages/auth/Auth';
import { Feed } from './pages/feed/Feed';
import { MovieInfo } from './pages/movieInfo/MovieInfo';
import { Movies } from './pages/movies/Movies';
import { Root } from './pages/root/Root';
import { store } from './store/store';

function App() {
  // Set the basename to the project name if in production, it will be empty otherwise
  // This is used because the project is hosted on .../project2 on the VM
  const basename = import.meta.env.BASE_URL;

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
            path: 'login',
            element: <Auth />,
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
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
