export const mockState = {
  movies: {
    movies: [
      {
        id: '653f802e2a68d09459a498ac',
        title: 'Interstellar',
        genre: [
          'Adventure',
          'Drama',
          'Science Fiction'
        ],
        releaseDate: '2014-11-05',
        posterUrl: 'https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
        overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
        popularity: 110.531,
        rating: 5,
        reviews: null
      },
      {
        id: '653f80322a68d09459a4b16d',
        title: 'Interstella 5555: The 5tory of the 5ecret 5tar 5ystem',
        genre: [
          'Animation',
          'Science Fiction',
          'Music',
          'Adventure'
        ],
        releaseDate: '2003-05-28',
        posterUrl: 'https://image.tmdb.org/t/p/original/AsvPgdcSlHocAbMp3yGZXjPiKKF.jpg',
        overview: 'Four talented alien musicians are kidnapped by a record producer who disguises them as humans. Shep, a space pilot in love with bass player Stella, follows them to Earth. Reprogrammed to forget their real identities and renamed The Crescendolls, the group quickly becomes a huge success playing soulless corporate pop. At a concert, Shep manages to free all the musicians except Stella, and the band sets out to rediscover who they really are -- and to rescue Stella.',
        popularity: 17.023,
        rating: null,
        reviews: null
      },
      {
        id: '653f80312a68d09459a4a788',
        title: 'Interstate 60',
        genre: [
          'Adventure',
          'Comedy',
          'Fantasy'
        ],
        releaseDate: '2002-04-13',
        posterUrl: 'https://image.tmdb.org/t/p/original/zZQt29qBWLoVVOo8HEFzFYRAgYQ.jpg',
        overview: 'An aspiring painter meets various characters and learns valuable lessons while traveling across America.',
        popularity: 23.403,
        rating: null,
        reviews: null
      },
      {
        id: '653f802f2a68d09459a49e03',
        title: 'Intersect',
        genre: [
          'Horror',
          'Science Fiction',
          'Thriller'
        ],
        releaseDate: '2020-02-12',
        posterUrl: 'https://image.tmdb.org/t/p/original/e6hgmD0P133bW5EH1kfhscwXN2a.jpg',
        overview: 'A group of young Miskatonic University scientists invent a time machine, only to learn that they are being manipulated by mysterious, unseen forces from another dimension.',
        popularity: 43.45,
        rating: null,
        reviews: null
      }
    ],
    moviesFetched: 4,
    pageSize: 12,
    allFetched: true,
    filters: {
      genres: [],
      sortBy: 'Name',
      direction: 'desc',
      search: 'inters'
    },
    gridLoadingState: {
      pending: false,
      fetchMorePending: false,
      rejected: false,
      resolved: true
    },
    detailsLoadingState: {
      pending: false,
      rejected: false,
      resolved: true
    },
    currentMovie: {
      id: '653f80322a68d09459a4af86',
      title: '2-Headed Shark Attack',
      genre: [
        'Horror',
        'Action',
        'Thriller',
        'Science Fiction'
      ],
      releaseDate: '2012-06-26',
      posterUrl: 'https://image.tmdb.org/t/p/original/tyKDKlex5RqBjx3OatVpTAfeAkD.jpg',
      overview: 'A Semester at Sea ship is attacked and sunk by a mutated two-headed shark, and the survivors seek refuge on a deserted atoll. The coeds, however, are no longer safe when the atoll starts flooding.',
      popularity: 17.907,
      rating: 1,
      reviews: null
    }
  },
  reviews: {
    movieReviews: {
      '653f80332a68d09459a4b660': [
        {
          id: '65573e820ca1ff98d1f24c5a',
          rating: 3,
          comment: 'Threeeee amigos',
          votes: [],
          date: '1700216450040',
          meta: {
            authorEmail: 'heihei@hei.hei',
            authorName: 'hei',
            movieId: '653f80332a68d09459a4b660',
            votesLength: 0,
          },
        }
      ],
      '653f802e2a68d09459a498ac': [
        {
          id: '654378e0dbd3ea2d65ca4d17',
          rating: 5,
          comment: 'Very bra\n',
          votes: [
            {
              vote: true,
              user: 'chrvei00@gmail.com',
            },
            {
              vote: true,
              user: 'cskrbkfcb8@gmail.com',
            },
            {
              vote: true,
              user: 'sjursenthor@gmail.com',
            },
            {
              vote: true,
              user: 'thorsj00@hotmail.com',
            },
            {
              vote: true,
              user: 'daviderbest@david',
            },
            {
              vote: true,
              user: 'test@test.test',
            }
          ],
          date: '1698920672976',
          meta: {
            authorEmail: 'david.k.foss@gmail.com',
            authorName: 'David Foss',
            movieId: '653f802e2a68d09459a498ac',
            votesLength: 6,
          },
          
        }
      ],
      '653f802e2a68d09459a4987b': [
        {
          id: '6556146cd189a5606973162a',
          rating: 3,
          comment: '123123',
          votes: [],
          date: '1700140140525',
          meta: {
            authorEmail: 'test@test.test',
            authorName: 'Test',
            movieId: '653f802e2a68d09459a4987b',
            votesLength: 0,
          },
        }
      ],
      '653f80322a68d09459a4b161': [
        {
          id: '654bd3f3f8df782677b7c3ee',
          rating: 4,
          comment: 'my guy',
          votes: [
            {
              vote: true,
              user: 'thorsj00@hotmail.com',
            }
          ],
          date: '1699468275462',
          meta: {
            authorEmail: 'daviderbest@david',
            authorName: 'DavidFoss',
            movieId: '653f80322a68d09459a4b161',
            votesLength: 1,
          },
        }
      ],
      '653f80322a68d09459a4af86': [
        {
          id: '6544fc6d00718b4e90c963c8',
          rating: 1,
          comment: 'Dead ting',
          votes: [
            {
              vote: true,
              user: 'sjursenthor@gmail.com',
            }
          ],
          date: '1699019885891',
          meta: {
            authorEmail: 'david.k.foss@gmail.com',
            authorName: 'David Foss',
            movieId: '653f80322a68d09459a4af86',
            votesLength: 1,
          },
        }
      ]
    },
    recentReviews: [
      {
        id: '65573e820ca1ff98d1f24c5a',
        rating: 3,
        comment: 'Threeeee amigos',
        votes: [],
        date: '1700216450040',
        meta: {
          authorEmail: 'heihei@hei.hei',
          authorName: 'hei',
          movieId: '653f80332a68d09459a4b660',
          movieTitle: '¡Three Amigos!',
          votesLength: 0,
        },
      },
      {
        id: '6556146cd189a5606973162a',
        rating: 3,
        comment: '123123',
        votes: [],
        date: '1700140140525',
        meta: {
          authorEmail: 'test@test.test',
          authorName: 'Test',
          movieId: '653f802e2a68d09459a4987b',
          movieTitle: '¡Qué Despadre!',
          votesLength: 0,
        },
      },
      {
        id: '654bd3f3f8df782677b7c3ee',
        rating: 4,
        comment: 'my guy',
        votes: [
          {
            vote: true,
            user: 'thorsj00@hotmail.com',
          }
        ],
        date: '1699468275462',
        meta: {
          authorEmail: 'daviderbest@david',
          authorName: 'DavidFoss',
          movieId: '653f80322a68d09459a4b161',
          movieTitle: 'Crows Are White',
          votesLength: 1,
        },
      }
    ],
    popularReviews: [
      {
        id: '654378e0dbd3ea2d65ca4d17',
        rating: 5,
        comment: 'Very bra\n',
        votes: [
          {
            vote: true,
            user: 'chrvei00@gmail.com',
          },
          {
            vote: true,
            user: 'cskrbkfcb8@gmail.com',
          },
          {
            vote: true,
            user: 'sjursenthor@gmail.com',
          },
          {
            vote: true,
            user: 'thorsj00@hotmail.com',
          },
          {
            vote: true,
            user: 'daviderbest@david',
          },
          {
            vote: true,
            user: 'test@test.test',
          }
        ],
        date: '1698920672976',
        meta: {
          authorEmail: 'david.k.foss@gmail.com',
          authorName: 'David Foss',
          movieId: '653f802e2a68d09459a498ac',
          movieTitle: 'Interstellar',
          votesLength: 6,
        },
      },
      {
        id: '65435b1f51ddff52100c47ad',
        rating: 4,
        comment: 'Amazing!',
        votes: [
          {
            vote: true,
            user: 'cskrbkfcb8@gmail.com',
          },
          {
            vote: true,
            user: 'sjursenthor@gmail.com',
          },
          {
            vote: true,
            user: 'thorsj00@hotmail.com',
          },
          {
            vote: true,
            user: 'test@test.test',
          }
        ],
        date: '1698913055256',
        meta: {
          authorEmail: 'david.k.foss@gmail.com',
          authorName: 'David Foss',
          movieId: '653f802e2a68d09459a499ee',
          movieTitle: 'xXx: Return of Xander Cage',
          votesLength: 4,
        },
      },
      {
        id: '6544fc6d00718b4e90c963c8',
        rating: 1,
        comment: 'Dead ting',
        votes: [
          {
            vote: true,
            user: 'sjursenthor@gmail.com',
          }
        ],
        date: '1699019885891',
        meta: {
          authorEmail: 'david.k.foss@gmail.com',
          authorName: 'David Foss',
          movieId: '653f80322a68d09459a4af86',
          movieTitle: '2-Headed Shark Attack',
          votesLength: 1,
        },
      }
    ],
    loadingStates: {
      reviews: {
        pending: false,
        rejected: false,
        resolved: true
      },
      recentReviews: {
        pending: false,
        rejected: false,
        resolved: true
      },
      popularReviews: {
        pending: false,
        rejected: false,
        resolved: true
      }
    }
  },
  user: {
    user: {
      id: '6557db0f65f252bac0159890',
      name: 'e',
      email: 'e@e',
    },
    loadingState: {
      pending: false,
      rejected: false,
      resolved: true
    }
  }
};