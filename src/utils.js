import { adjectives, nouns } from "./words";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
dotenv.config();

// 임의 문자 생성 함수
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// 이메일 보내기 함수
console.log(process.env.SENDGRID_USERNAME);
const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  // console.log("clinet.sendMail(email);", client.sendMail(email)); // 프로미스객체 반환
  return client.sendMail(email);
  // If callback argument is not set then the method returns a Promise object.
  // https://nodemailer.com/usage/#sending-mail
};

export const sendSecretMail = (adress, secret) => {
  const email = {
    from: "seungho@prismagram.com",
    to: adress,
    subject: "🔑 Login Secret for prismagram 🔑",
    html: `안녕하세요. 당신의 로그인 secret은 ${secret}입니다.<br> 이 값을 복사하여 앱에 붙여넣기 해주세요`
  };
  return sendMail(email);
};
