import { useQuery } from "@tanstack/react-query";
import { VoteResultResponse } from "@/types/vote";
import { fetchMyVoteResult, fetchUserVoteResult } from "@/api/vote";
// 나의 투표 결과
export const useMyVoteResultQuery = (isLoggedIn: boolean) => {
  return useQuery<VoteResultResponse>({
    queryKey: ["myVoteResult"],
    queryFn: fetchMyVoteResult,
    retry: false,
    enabled: isLoggedIn,
  });
};

// 유저 투표 결과
export const useUserVoteResultQuery = (userId: string) => {
  return useQuery<VoteResultResponse>({
    queryKey: ["userVoteResult", userId],
    queryFn: () => fetchUserVoteResult(userId),
    retry: false,
  });
};
