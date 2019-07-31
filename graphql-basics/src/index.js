// Named export
import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)
const typeDefs = `
type Query {
    hello: String!
    name: String!
    location: String!
    bio: String!
}

`;
// Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first Query!";
    },
    name() {
      return "Alexander";
    },
    location() {
      return "Skovde"
    },
    bio() {
      return "24 year old"
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
