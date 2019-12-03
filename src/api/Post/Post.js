import { prisma } from "../../../generated/prisma-client";

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    likes: ({ id }) => prisma.post({ id }).likes(),
    isLiked: (parent, _, { request }) => {
      // 해당 Like 가 있는지를 찾는다.
      const { id } = parent;
      const { user } = request;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id
            }
          }
        ]
      });
    },
    likeCount: async parent => {
      return prisma
        .likesConnection({
          // where 통해 likes 검색 조건 생성
          where: { post: { id: parent.id } }
        })
        .aggregate()
        .count();
      // 집합 관련(ex/ count)
      // -->https://www.prisma.io/docs/prisma-client/basic-data-access/reading-data-JAVASCRIPT-rsc2/#aggregations
    }
  }
};
