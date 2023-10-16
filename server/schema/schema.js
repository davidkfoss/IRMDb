const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLInt } = graphql;

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
    genre: ['Crime', 'Mystery', 'Thriller'],
    releaseDate: '2022-03-01',
    posterUrl: 'https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    overview:
      'In his second year of fighting crime, Batman uncovers corruption in Gotham City that connects to his own family while facing a serial killer known as the Riddler.',
    popularity: 3827.658,
  },
  {
    id: 3,
    title: 'No Exit',
    genre: ['Thriller'],
    releaseDate: '2022-02-25',
    posterUrl: 'https://image.tmdb.org/t/p/original/vDHsLnOWKlPGmWs0kGfuhNF4w5l.jpg',
    overview:
      'Stranded at a rest stop in the mountains during a blizzard, a recovering addict discovers a kidnapped child hidden in a car belonging to one of the people inside the building which sets her on a terrifying struggle to identify who among them is the kidnapper.',
    popularity: 2618.087,
  }];

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLList(GraphQLString) },
        releaseDate: { type: GraphQLString },
        posterUrl: { type: GraphQLString },
        overview: { type: GraphQLString },
        popularity: { type: GraphQLFloat }
    })
});

const ReviewType = new GraphQLObjectType({
    name: 'Review',
    fields: () => ({
        rating: { type: GraphQLInt },
        comment: { type: GraphQLString },
        author: {
            type: UserType,
            resolve(parent, args) {
                return "User.findById(parent.authorId)";
            }
         },
    })
});

const ReviewInfoType = new GraphQLObjectType({
    name: 'ReviewInfo',
    fields: () => ({
        reviews: { type: new GraphQLList(ReviewType) },
        count: { type: GraphQLInt },
        average: { type: GraphQLFloat },
        movie: {
            type: MovieType,
            resolve(parent, args) {
                return "Movie.findById(parent.movieId)";
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        profilePictureUrl: { type: GraphQLString },
        reviews: { type: new GraphQLList(ReviewType) }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return mockMovies.find(movie => movie.id == args.id);
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return mockMovies;
            }
        },
        reviewInfo: {
            type: ReviewInfoType,
            args: { movieId: { type: GraphQLID } },
            resolve(parent, args) {
                return Review.find({ movieId: args.movieId }).then(reviews => {
                    const count = reviews.length;
                    const average = reviews.reduce((acc, review) => acc + review.rating, 0) / count;
                    return "{ reviews, count, average, movieId: args.movieId }";
                });
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return "User.findById(args.id)";
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                profilePictureUrl: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return "";
            }
        },
        addReview: {
            type: ReviewType,
            args: {
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                comment: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                movieId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let review = new Review({
                    rating: args.rating,
                    comment: args.comment,
                    authorId: args.authorId,
                    movieId: args.movieId
                });
                return "";
            }
        },
    }
});

exports.schema = new GraphQLSchema({ query: RootQuery });
