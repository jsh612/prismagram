import { isAuthenticated } from "../../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

// Like를 바꾸는 역활(좋아요, 싫어요 표시)
export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;
      try {
        // 해당 유저가 해당 게시물에 like를 했는지 여부를 찾는다.
        const existingLike = await prisma.$exists.like({
          // AND 로 두개의 조건 사용 가능
          AND: [
            {
              user: {
                id: user.id
              }
            },
            {
              post: {
                id: postId
              }
            }
          ]
        });
        if (existingLike) {
          //TO DO (이전에 like를 했는데 다시 클릭시 like 취소, 즉 like 취소)
        } else {
          // 이전에 좋아혀를 누른적이 없을 경우, like 생성
          const newLike = prisma.createLike({
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
        }
        return true;
      } catch (error) {
        console.log("toggleLike 에러:", error);
        return false;
      }
    }
  }
};
