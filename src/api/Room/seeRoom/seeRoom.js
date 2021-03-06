import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { roomId } = args;
      const { user } = request;
      // 해당 room이 존재해는지 알아보기.
      const canSee = prisma.$exists.room({
        participants_some: {
          id: user.id
        }
      });
      if (canSee) {
        // return prisma.room({ id: roomId });
        const room = await prisma.room({ id: roomId });
        return room;
      } else {
        throw Error("해당 대화방을 볼 수 없습니다.");
      }
    }
  }
};
