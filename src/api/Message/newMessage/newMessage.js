import { prisma } from "../../../../generated/prisma-client";

export default {
  Subscription: {
    newMessage: {
      // # subscription의 resolve는 query,mutation와 다음과 같은 차이가 있다.
      //1. Rather than returning any data directly, they return an AsyncIterator
      //   which subsequently is used by the GraphQL server to push the event data to the client.
      //2. Subscription resolvers are wrapped inside an object and
      //  need to be provided as the value for a subscribe field.
      //  You also need to provide another field called resolve that
      //  actually returns the data from the data emitted by the AsyncIterator.
      subscribe: (_, args) => {
        const { roomId } = args;
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId }
                }
              }
            ]
          })
          .node();
      },
      resolve: payload => {
        console.log("payload >>", payload);
        // payload >> {
        //   mutation: 'CREATED',
        //   node: {
        //     id: 'ck3pgyk3mwvr60b09x00wpkfl',
        //     text: '안녕3~~',
        //     createdAt: '2019-12-03T06:16:09.538Z',
        //     updatedAt: '2019-12-03T06:16:09.538Z'
        //   },
        //   updatedFields: null,
        //   previousValues: null
        // }
        return payload;
      }
    }
  }
};
