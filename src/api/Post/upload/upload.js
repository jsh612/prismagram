import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { caption, files, location } = args;
      const { user } = request;
      const post = await prisma.createPost({
        caption,
        user: {
          connect: {
            id: user.id
          }
        },
        location
      });
      // file을 생성하여 위에서 생성된 post에 연결해준다.
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: { connect: { id: post.id } }
          })
      );
      return post;
    }
  }
};
