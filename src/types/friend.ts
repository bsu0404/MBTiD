import { mbtiType } from "./mbti";

export interface MyFriendRes {
  message: string;
  data: FriendData[];
}

export interface FriendData {
  user_id: string;
  nickname: string;
  mbti: mbtiType;
  mbti_ei_score: number;
  mbti_sn_score: number;
  mbti_tf_score: number;
  mbti_pj_score: number;
}
export interface CheckFriendRes {
  isFriend: boolean;
  message: string;
}
