// Named export
import { GraphQLServer } from "graphql-yoga";
import uuidv4 from 'uuid/v4';

//Scalar types - String, Boolean, Int, Float, ID

// Demo user data
let users = [
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

let posts = [
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

let comments = [
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
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: ID): Comment!
    
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
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
      const emailTaken = users.some(user => user.email === args.data.email);
      
      if(emailTaken) {
        throw new Error("Email already taken");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      }

      users.push(user);
      return user;
    
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex(user => user.id = args.id);
      if(userIndex === -1) {
        throw new Error("User not found");
      }

      const deletedUsers = users.splice(userIndex, 1);

      posts = posts.filter(post => {
        const match = post.author === args.id;

        if(match) {
          comments = comments.filter(comment => comment.post !== post.id)
        }

        return !match;
      })

      comments = comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },
     createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if(!userExists) {
        throw new Error("User not found");
      }

      const post = {
        id: uuidv4(),
        ...args.data
      }

      posts.push(post);
      return post;
    },
    deletePost(parent, args, ctx, info) {
      const postExists = posts.findIndex(post => post.id === args.id);
      if(postExists === -1) {
        throw new Error("Post not found");
      }

      deletedPosts = posts.splice(postExists, 1);
      comments = comments.filter(comment => comment.post === args.id);

      return deletedPosts[0];
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if(!userExists) {
        throw new Error("User not found");
      }
      
      const postExists = posts.some(post => post.id === args.data.post);

      if(!postExists) {
        throw new Error("Post not found");
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      }

      

      comments.push(comment);
      return comment;
    },
    deleteComment( parent, args, ctx, info) {
      const commentIndex = comments.findIndex(comment => comment.id === args.id);
      if(commentIndex === -1) {
        throw new Error("Comment not found");
      }

      const deletedComments = comments.splice(commentIndex, 1);

      return deletedComments[0];
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
