import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      // 해당 Room있는지를 체크해서 (해당 room이 없는 경우 생성) message 생성
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (!roomId) {
        if (user.id !== toId) {
          // 나혼자 room 만들지 않게 하기위해서 체크
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: user.id }, { id: toId }]
            }
          });
        }
      } else {
        room = await prisma.room({ id: roomId });
        if (!room) {
          throw Error("해당 대화방을 찾을 수 없습니다.");
        }
      }
      return null;
    }
  }
};
