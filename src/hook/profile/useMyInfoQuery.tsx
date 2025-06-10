import { useQuery } from "@tanstack/react-query";
import { fetchMyProfile } from "@/api/profile";
import { UserMbtiProfile } from "@/types/profile";
// 내 프로필 조회
export const useMyProfileQuery = (isLoggedIn: boolean) => {
  return useQuery<UserMbtiProfile>({
    queryKey: ["MyProfile"],
    queryFn: fetchMyProfile,
    retry: false,
    enabled: isLoggedIn,
  });
};
