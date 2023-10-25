import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import { MovieInfo } from './pages/movieInfo/MovieInfo';
import { Movies } from './pages/movies/Movies';
import { Feed } from './pages/feed/Feed';
import { Root } from './pages/root/Root';
import { store } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
      <GoogleOAuthProvider clientId='279259714095-qs93f4ssl6lssejv5j7ri5n2eq0j307i.apps.googleusercontent.com'>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </GoogleOAuthProvider>
    </ApolloProvider>
  );
}

export default App;
