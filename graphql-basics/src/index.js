// Named export
import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID

// id: ID!
// name: String!
// age: Int!
// employed: Boolean!
// gpa: Float
// title: String!
// price: Float!
// releaseYear: Int
// rating: Float
// inStock: Boolean

// id() {
//   return "ABC12345";
// },
// name() {
//   return "Alexander";
// },
// age() {
//   return 24;
// },
// employed() {
//   return true;
// },
// gpa() {
//   return 3.17;
// },
// title() {
//   return "Memes strikes Back Volume 2";
// },
// price() {
//   return 3.5;
// },
// releaseYear() {
//   return 2019;
// },
// rating() {
//   return 4.6;
// },
// inStock() {
//   return true;
// }

// Type definitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String): String!
    me: User!
    post: Post!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "12134",
        name: "Mike",
        email: "mike@example.com"
      };
    },
    post() {
      return {
        id: "12134",
        title: "Mike",
        body: "mike@example.com",
        published: false
      };
    },
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello! ${args.name}`;
      }
      return "Hello!";
    },
    add(parent, args) {
      if(args.numbers.lenth === 0) {
        return 0;
      }

      return args.numbers.reduce((accumolator, currentValue) => accumolator + currentValue);
    },
    grades(parent, args, ctx, info) {
      return [99,80, 92];
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
