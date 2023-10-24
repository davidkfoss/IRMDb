const mockMovies = [
  {
    id: 1,
    title: 'Spider-Man: No Way Home',
    genre: ['Action', 'Adventure', 'Science Fiction'],
    releaseDate: '2021-12-15',
    posterUrl: 'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    overview:
      'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
    popularity: 5083.954,
  },
  {
    id: 2,
    title: 'The Batman',
    genre: ['Crime', 'Mystery', 'Thriller','Action'],
    releaseDate: '2022-03-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    popularity: 3827.658,
  },
  {
    id: 3,
    title: 'No Exit',
    genre: ['Thriller','Action'],
    releaseDate: '2022-02-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg',
    overview:
      'Stranded at a rest stop in the mountains during a blizzard, a recovering addict discovers a kidnapped child hidden in a car belonging to one of the people inside the building which sets her on a terrifying struggle to identify who among them is the kidnapper.',
    popularity: 2618.087,
}];

const mockReviews = [
  {
    id: 1,
    movieId: 1, // Associated with Spider-Man: No Way Home
    authorId: 101, // Associated with Author 1
    rating: 5,
    comment: 'Great movie!',
  },
  {
    id: 2,
    movieId: 1, // Associated with Spider-Man: No Way Home
    authorId: 102, // Associated with Author 2
    rating: 4,
    comment: 'Awesome film!',
  },
  {
    id: 3,
    movieId: 2, // Associated with The Batman
    authorId: 101, // Associated with Author 1
    rating: 4,
    comment: 'Loved it!',
  },
  {
    id: 4,
    movieId: 2, // Associated with The Batman
    authorId: 103, // Associated with Author 3
    rating: 3,
    comment: 'Not bad!',
  }
];

const mockUsers = [
    {
        id: 101,
        email: 'a@a',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
    },
    {
        id: 102,
        email: 'b@b',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg'
    },
    {
        id: 103,
        email: 'c@c',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg'
    },
    {
        id: 104,
        email: 'd@d',
        profilePictureUrl: 'https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg'
    }];

const db = {
    movies: mockMovies,
    reviews: mockReviews,
    users: mockUsers
}

module.exports = {db};