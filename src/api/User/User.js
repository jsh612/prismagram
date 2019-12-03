import { prisma } from "../../../generated/prisma-client";

// 모든 computed field 이곳으로
export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_none: { id } } })
        .aggregate()
        .count(),
    fullName: parent => {
      // console.log("me.js:", parents) // User 객체
      //resolver의 첫번째 인자 = 부로를 가져온다 (fullName의 부모는 User)
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      // isFollowing의 부모(특정유저)의 팔로워 중에 로그인한유저("나")가 있는지 검색하여
      // 내가 특정유저를 팔로잉하는지 여부를 알아낸다.
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: parentId
            },
            {
              followers_some: {
                id: user.id
              }
            }
          ]
        });
      } catch (error) {
        console.log("computed.js / amIFollowing / error: ", error);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      // 해당 유저가 로그인한 "나"인지 확인
      const { user } = request;
      const { id } = parent;
      return user.id === parentId;
    }
  }
};
