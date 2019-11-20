import { isAuthenticated } from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    follow: async (_, args, { request }) => {
      isAuthenticated(request); // 로그인 여부 확인
      const { id } = args; // 좋아하는 사람 id
      const { user } = request; // 지금 로그인한 이용자
      try {
        // request.user가 args.id 값을 갖은 유저를 팔로잉
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            following: {
              connect: {
                id
              }
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
