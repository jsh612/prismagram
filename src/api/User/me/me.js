import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user({ id: user.id });

      // user를 찾아서 그 user의 posts를 정보 획득하기
      const posts = await prisma.user({ id: user.id }).posts();
      return { user: userProfile, posts };
    }
  }
};
