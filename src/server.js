import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import path from "path";

// 인증 처리 적용을 위해 passport모듈과 passport.js import
import passport from "passport";
import "./passport";

import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { uploadMiddleware, uploadController } from "./upload";

dotenv.config();

const { PORT } = process.env || 4000;

const server = new GraphQLServer({
  schema,

  //context --> app이 resolver에게 정보를 전달 할때 사용(이 정보는 모든 resolver에서 사용가능)
  //resolver에서 해당 context 사용법: https://graphql.org/learn/execution/#root-fields-resolvers
  context: ({ request }) => ({ request, isAuthenticated })
  // request객체 가져와서 resolver에 전달 // isAuthenticated를 전달
  // context: arg => {
  //   console.log(arg); // request객체, response객체 다 들어옴
  // }
});

//Graphql 서버에는 Express 서버가 내장 되어있다
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.post("/api/upload", uploadMiddleware, uploadController);

server.start({ port: PORT }, () =>
  console.log(`✅   GraphQL서버  http://localhost:${PORT}`)
);
