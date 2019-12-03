import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { postId } = args;
      return prisma.post({ id: postId });
    }
  }
};
