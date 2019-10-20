import { Prisma } from "prisma-binding";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466"
});

// prisma.query.comments(null, "{id text author { id name } }").then(data => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: "Mepe",
//         body: "Meeepers is peepers",
//         published: true,
//         author: {
//           connect: {
//             id: 3
//           }
//         }
//       }
//     },
//     "{ id title body published }"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data));
//     prisma.query.users(null, "{id name posts { id title } }").then(data => {
//       console.log(JSON.stringify(data, undefined, 2));
//     });
//   });

// Async stuff is ez

// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         title: "Pleeb",
//         body: "Meeepers is peepers",
//         published: false
//       },
//       where: {
//         id: "ck1yrxel5024p0750a7f25ib2"
//       }
//     },
//     "{ id title body published }"
//   )
//   .then(data => {
//     console.log(JSON.stringify(data));
//     prisma.query.users(null, "{id name posts { id title } }").then(data => {
//       console.log(JSON.stringify(data, undefined, 2));
//     });
//   });
