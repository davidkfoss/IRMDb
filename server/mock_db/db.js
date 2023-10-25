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
},
  {
    id: 4,
    title: 'Encanto',
    genre: ['Animation', 'Comedy', 'Family', 'Fantasy'],
    releaseDate: '2021-11-24',
    posterUrl: 'https://image.tmdb.org/t/p/original/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
    overview:
      "The tale of an extraordinary family, the Madrigals, who live hidden in the mountains of Colombia, in a magical house, in a vibrant town, in a wondrous, charmed place called an Encanto. The magic of the Encanto has blessed every child in the family with a unique gift from super strength to the power to heal—every child except one, Mirabel. But when she discovers that the magic surrounding the Encanto is in danger, Mirabel decides that she, the only ordinary Madrigal, might just be her exceptional family's last hope.",
    popularity: 2402.201,
  },
  {
    id: 5,
    title: "The King's Man",
    genre: ['Action', 'Adventure', 'Thriller', 'War'],
    releaseDate: '2021-12-22',
    posterUrl: 'https://image.tmdb.org/t/p/original/aq4Pwv5Xeuvj6HZKtxyd23e6bE9.jpg',
    overview:
      "As a collection of history's worst tyrants and criminal masterminds gather to plot a war to wipe out millions, one man must race against time to stop them.",
    popularity: 1895.511,
  }
];

const mockReviews = [
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