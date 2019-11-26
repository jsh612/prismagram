import { prisma } from "../../../../generated/prisma-client";

const EDIT = "EDIT";
const DELETE = "DELETE";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({
        //해당 포스트를 작성한 자만 수정 가능하도록 하기위함.
        AND: [{ id }, { user: { id: user.id } }]
      });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            where: {
              id
            },
            data: {
              caption,
              location
            }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("해당 게시물을 찾을 수 없습니다.");
      }
    }
  }
};
