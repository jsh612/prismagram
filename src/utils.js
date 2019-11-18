import { adjectives, nouns } from "./words";

// 임의 문자 생성 함수
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};
