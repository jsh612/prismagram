import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // JWT 리턴
        return "TOKEN";
      } else {
        throw Error("잘못된 email/비밀문자 결합입니다.");
      }
    }
  }
};
