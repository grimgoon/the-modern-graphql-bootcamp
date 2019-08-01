// Named export
import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean

}
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "ABC12345";
    },
    name() {
      return "Alexander";
    },
    age() {
      return 24
    },
    employed() {
      return true
    },
    gpa() {
      return 3.17
    },
    title() {
      return "Memes strikes Back Volume 2"
    },
    price() {
      return 3.50
    },
    releaseYear() {
      return 2019
    },
    rating() {
      return 4.6
    },
    inStock() {
      return true
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log("The server is up");
});
