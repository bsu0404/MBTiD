import { mbtiType } from "@/types/mbti";

export const getMbtiImageSrc = (mbti: string) => `/assets/mbti/${mbti}.svg`;

const mbtiColorMap: Record<mbtiType, "purple" | "green" | "blue" | "yellow"> = {
  // purple
  INTJ: "purple",
  INTP: "purple",
  ENTJ: "purple",
  ENTP: "purple",

  // green
  INFJ: "green",
  INFP: "green",
  ENFJ: "green",
  ENFP: "green",

  // blue
  ISTJ: "blue",
  ISFJ: "blue",
  ESTJ: "blue",
  ESFJ: "blue",

  // yellow
  ISTP: "yellow",
  ISFP: "yellow",
  ESTP: "yellow",
  ESFP: "yellow",
};

export const getMbtiMiniProfileImage = (mbti: mbtiType): string => {
  const color = mbtiColorMap[mbti];
  return `/assets/mbti-mini/${color}.svg`;
};
