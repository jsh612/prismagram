import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      //팔로윙 하는 사람들을 가져와서 그들이 올린 포스트들을 보여준다.(내가 올린 포스트도 포함)
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      console.log("seeFeed.js / following: ", following);
      return prisma.posts({
        where: {
          user: {
            id_in: [...following.map(user => user.id), user.id]
          }
        },
        orderBy: "createdAt_DESC"
      });
    }
  }
};
