import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      // 해당 Room있는지를 체크해서 (해당 room이 없는 경우 생성) message 생성
      // 이를 위해 roomId, 내 id, 상대방 id 필요
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room = null;
      let notMe = null;
      if (!roomId) {
        // 나혼자 room 만들지 않게 하기위해서 체크
        if (user.id !== toId) {
          // 대화방이 없는경우 새로 생성하여 필요 정보를 가져온다.
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: user.id }, { id: toId }]
            }
          });
        }
      } else {
        // 이미 대화방이 있는경우, 그 대화방에서 참여자 id를 찾아낸다.
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
        if (!room) {
          throw Error("해당 대화방을 찾을 수 없습니다.");
        }
        notMe = room.participants.filter(partic => partic.id !== user.id)[0];
      }
      return prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: notMe ? notMe.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
    }
  }
};
