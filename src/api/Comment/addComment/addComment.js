import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request); // 로그인한 유저만 코멘트 작성 가능
      const { text, postId } = args;
      const { user } = request;
      const newComment = await prisma.createComment({
        text,
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        }
      });
      return newComment;
    }
  }
};
