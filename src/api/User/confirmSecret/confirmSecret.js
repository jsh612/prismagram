import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // token 생성
        return generateToken(user.id);
      } else {
        throw Error("잘못된 email/비밀문자 결합입니다.");
      }
    }
  }
};
