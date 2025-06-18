import { useQuery } from "@tanstack/react-query";
import { VoteListResponse } from "@/types/vote";
import { fetchMyVoteList, fetchUserVoteList } from "@/api/vote";
// 나의 투표 리스트 (방명록)
export const useMyVoteListQuery = (isLoggedIn: boolean) => {
  return useQuery<VoteListResponse>({
    queryKey: ["myVoteList"],
    queryFn: fetchMyVoteList,
    retry: false,
    enabled: isLoggedIn,
    staleTime: 60000, // 1분동안 유효
  });
};
// 유저 투표 리스트 (방명록)
export const useUserVoteListQuery = (userId: string) => {
  return useQuery<VoteListResponse>({
    queryKey: ["userVoteList", userId],
    queryFn: () => fetchUserVoteList(userId),
    retry: false,
    staleTime: 60000, // 1분동안 유효
  });
};
