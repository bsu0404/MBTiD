import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyProfile, updateMbti, updateNickname } from "@/api/profile";
import { MbtiUpdateReq, UserMbtiProfile } from "@/types/profile";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth";
// 내 프로필 조회
export const useMyProfileQuery = () => {
  const { isLoggedIn } = useAuthStore();
  return useQuery<UserMbtiProfile>({
    queryKey: ["myProfile"],
    queryFn: fetchMyProfile,
    retry: false,
    enabled: isLoggedIn,
    staleTime: 30 * 60 * 1000, // 30분동안 유효
    gcTime: 60 * 60 * 1000, // 1시간동안 유효
  });
};
// 닉네임 수정
export const useUpdateMbtiMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: MbtiUpdateReq) => updateMbti(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      navigate(`/`);
    },
    onError: () => {
      alert("문제가 발생했습니다.");
    },
  });
};
// mbti 수정
export const useUpdateNicknameMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (nickname: string) => updateNickname(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      navigate(`/`);
    },
    onError: () => {
      alert("문제가 발생했습니다.");
    },
  });
};
