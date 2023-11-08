import { ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { client } from './client';
import { Feed } from './pages/feed/Feed';
import { MovieInfo } from './pages/movieInfo/MovieInfo';
import { Movies } from './pages/movies/Movies';
import { Root } from './pages/root/Root';
import { store } from './store/store';

function App() {
  // Set the basename to the project name if in production, otherwise set it to undefined
  // This is used because the project is hosted on .../project2 on the VM
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

  // The client id for the google oauth provider
  // Note that this is a public id, and is not a secret, thus is not in .env.
  const clientId = '279259714095-qs93f4ssl6lssejv5j7ri5n2eq0j307i.apps.googleusercontent.com';

  return (
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
          <Toaster />
          <RouterProvider router={router} />
        </Provider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
}

export default App;
