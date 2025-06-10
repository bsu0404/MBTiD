import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "../../api/profile";
import { UserMbtiProfile } from "@/types/profile";
// 유저 프로필 조회
export const useUserProfileQuery = (userId: string) => {
  return useSuspenseQuery<UserMbtiProfile>({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(userId),
  });
};
