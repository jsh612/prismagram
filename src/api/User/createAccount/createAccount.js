import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      // firstName 등에 빈문자열로 구조분해할당 기본값 설정
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      try {
        const user = await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio
        });
        return true;
      } catch (error) {
        console.log("createAccount 에러: ", error);
        return false;
      }
    }
  }
};
