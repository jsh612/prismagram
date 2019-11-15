import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";

dotenv.config();

const { PORT } = process.env || 4000;

const typeDefs = `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "안녕"
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start({ port: PORT }, () =>
  console.log(`GraphQL서버 시작 ✅ http://localhost:${PORT}`)
);
