import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestSceret: async (_, arg) => {
      const { email } = arg;
      const loginSecret = generateSecret();
      console.log("로그인시크릿", loginSecret);
      try {
        // 이메일 보내기
        sendSecretMail(email, loginSecret);

        // prisma.updateUser
        //https://www.prisma.io/docs/prisma-client/basic-data-access/writing-data-JAVASCRIPT-rsc6/#updating-records
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};
