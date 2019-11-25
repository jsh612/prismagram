import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { postId } = args;
      const post = await prisma.post({ id: postId });
      const comments = await prisma
        .post({ id: postId })
        .comments()
        .$fragment(COMMENT_FRAGMENT);

      // 집합 관련(ex/ count)
      // -->https://www.prisma.io/docs/prisma-client/basic-data-access/reading-data-JAVASCRIPT-rsc2/#aggregations
      const likesCount = await prisma
        .likesConnection({
          // where 통해 likes 검색 조건 추가
          where: { post: { id: postId } }
        })
        .aggregate()
        .count();
      const files = await prisma.post({ id: postId }).files();
      const user = await prisma.post({ id: postId }).user();
      return { post, comments, likesCount, files, user };
    }
  }
};
