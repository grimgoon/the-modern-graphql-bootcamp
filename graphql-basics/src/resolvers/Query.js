const Query = {
    users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }

      return db.users.filter(user =>
        user.name.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    posts(parent, args, { db }, info) {
      if (!args.query) {
        return db.posts;
      }

      return db.posts.filter(
        post =>
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    },
    comments(parent, args, { db }, info) {
      return db.comments;
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
  }

  export { Query as default }