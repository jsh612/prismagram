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
  },
  User: {
    fullName: (parent) => {
      // console.log("me.js:", parents) // User 객체 
      //resolver의 첫번째 인자 = 부로를 가져온다 (fullName의 부모는 User)
      return `${parent.firstName} ${parent.lastName}`
    }
  }
};
