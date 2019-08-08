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

const db = {
  users,
  posts,
  comments
};

export { db as default };
