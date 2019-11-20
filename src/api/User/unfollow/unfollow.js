import { isAuthenticated } from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    unfollow: async (_, args, { request }) => {
      isAuthenticated(request); //로그인 여부확인
      const { id } = args;
      const { user } = request;
      try {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              disconnect: { id }
            }
          }
        });
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
