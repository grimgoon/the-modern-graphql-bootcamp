// Named export
import { GraphQLServer } from "graphql-yoga";
import uuidv4 from 'uuid/v4';

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

const comments = [
  {
    id: "1",
    text: "This is awesome!",
    author: "1",
    post: "1"
  },
  {
    id: "2",
    text: "This is awesome!",
    author: "1",
    post: "2"
  },
  {
    id: "3",
    text: "This is awesome!",
    author: "1",
    post: "2"
  },
  {
    id: "4",
    text: "This is awesome!",
    author: "1",
    post: "2"
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID): Post!
    createComment(text: String!, author: ID, post: ID): Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    comments(parent, args, ctx, info) {
      return comments;
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email);
      
      if(emailTaken) {
        throw new Error("Email already taken");
      }

      const user = {
        id: uuidv4(),
        ...args
      }

      users.push(user);
      return user;
    }, createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);

      if(!userExists) {
        throw new Error("User not found");
      }

      const post = {
        id: uuidv4(),
        ...args
      }

      posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);

      if(!userExists) {
        throw new Error("User not found");
      }
      
      const postExists = posts.some(post => post.id === args.post);

      if(!postExists) {
        throw new Error("Post not found");
      }

      const comment = {
        id: uuidv4(),
        ...args
      }

      

      comments.push(comment);
      return comment;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => parent.author === user.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
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
