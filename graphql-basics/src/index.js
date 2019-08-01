// Named export
import { GraphQLServer } from "graphql-yoga";

//Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: "1",
    name: "Alexander",
    email: "asd@asdse",
    age: "24"
  },
  {
    id: "2",
    name: "Jessica",
    email: "asd@asd.see",
    age: "27"
  },
  {
    id: "3",
    name: "Mike",
    email: "Mike@asdse",
    age: "45"
  }
];

const posts = [
  {
    id: "1",
    title: "Meepq",
    body: "Meep the Meep",
    published: true,
    author: "3"
  },
  {
    id: "2",
    title: "Meep",
    body: "Meep the Meep",
    published: true,
    author: "2"
  },
  {
    id: "3",
    title: "Meep",
    body: "Meep the Meepq",
    published: true,
    author: "1"
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return posts.filter(
        post =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    },
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
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => parent.author === user.id);
    }
  },
  User: {
    posts(parent,args, ctx, info) {
      return posts.filter(post => post.author === parent.id)
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
