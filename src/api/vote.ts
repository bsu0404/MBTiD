import {
  VoteListResponse,
  VoteRequest,
  VoteResultResponse,
} from "@/types/vote";
import { api } from "./https";
import { AxiosError } from "axios";

// 내 투표 결과 조회
export const fetchMyVoteResult = async () => {
  const res = await api.get<VoteResultResponse>("/vote/result/my");
  return res.data;
};
// 유저 투표 결과 조회
export const fetchUserVoteResult = async (userId: string) => {
  const res = await api.get<VoteResultResponse>(`home/vote/result/${userId}`);
  return res.data;
};
// 투표 생성
export const createVote = async (payload: VoteRequest) => {
  try {
    const response = await api.post("/vote", payload);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 470) {
        throw new Error("이미 투표하셨습니다.");
      }
    }
    throw new Error("문제가 발생했습니다.");
  }
};
// 내 방명록 리스트 조회
export const fetchMyVoteList = async () => {
  const res = await api.get<VoteListResponse>("/vote/list/my");
  return res.data;
};
// 유저 투표 결과 조회
export const fetchUserVoteList = async (userId: string) => {
  const res = await api.get<VoteListResponse>(`home/vote/list/${userId}`);
  return res.data;
};
