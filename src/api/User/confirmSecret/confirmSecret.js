import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { secret, email } = args;
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        // 로그인하고 나면 loginSecret 빈문자열로 변경
        await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            loginSecret: ""
          }
        });

        // token 생성
        return generateToken(user.id);
      } else {
        throw Error("잘못된 email/비밀문자 결합입니다.");
      }
    }
  }
};
