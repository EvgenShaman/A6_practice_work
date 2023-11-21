const {
    graphql, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLFloat, 
    GraphQLNonNull, 
    GraphQLList, 
    GraphQLSchema 
} = require("graphql");

const _ = require("graphql");

const books = [
    { id: "1", bid: "73898966-e68f-46bc-be55-a4f28bc646ef", book_name: "как стать успешным", authorId: "1" },
    { id: "2", bid: "7c97f5ee-4dc8-4538-bf69-63ee30bf0e74", book_name: "последнее желание", authorId: "2" },
    { id: "3", bid: "064b71d2-5807-4e59-a961-09b1366427e9", book_name: "как поймать бабочку", authorId: "b0124e22-6811-409a-90fb-6491f0a200db" }
];

const authors = [
    { id: "1", name: "Иван", surname: "Сергеев" },
    { id: "2", name: "Андрей", surname: "Иванов" },
    { id: "b0124e22-6811-409a-90fb-6491f0a200db", name: "Виктор", surname: "Андреев" }
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        bid: { type: GraphQLID },
        book_name: { type: GraphQLString },
        bookauthor: {
            type: BookAuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const BookAuthorType = new GraphQLObjectType({
    name: "BookAuthor",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        book: {
            type: BookType,
            resolve(parent, args) {
                return _.find(books, { authorId: parent.id });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        info: {
            type: GraphQLString,
            resolve(parent, args) {
                return "Сервер запущен";
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(BookAuthorType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                if (args.id) {
                    return _.find(authors, { id: args.id });
                } else {
                    return authors;
                }
            }
        }
    }
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addauthor: {
            type: BookAuthorType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                surname: { type: GraphQLString }
            },
            resolve(parent, args) {
                const newAuthor = { ...args };
                authors.push(newAuthor);
                return newAuthor;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});
