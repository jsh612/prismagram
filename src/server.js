import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

dotenv.config();

const { PORT } = process.env || 4000;

const server = new GraphQLServer({ schema });

//Graphql 서버에는 Express 서버가 내장 되어있다
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`✅   GraphQL서버  http://localhost:${PORT}`)
);
