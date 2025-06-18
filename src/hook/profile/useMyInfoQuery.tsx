import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMyProfile, updateMbti, updateNickname } from "@/api/profile";
import { MbtiUpdateReq, UserMbtiProfile } from "@/types/profile";
import { useNavigate } from "react-router-dom";
// 내 프로필 조회
export const useMyProfileQuery = (isLoggedIn: boolean) => {
  return useQuery<UserMbtiProfile>({
    queryKey: ["MyProfile"],
    queryFn: fetchMyProfile,
    retry: false,
    enabled: isLoggedIn,
    staleTime: 1800000, // 30분동안 유효
  });
};
// 닉네임 수정
export const useUpdateMbtiMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: MbtiUpdateReq) => updateMbti(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["MyProfile"] });
      alert("성공적으로 업데이트되었습니다.");
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
      queryClient.invalidateQueries({ queryKey: ["MyProfile"] });
      alert("성공적으로 업데이트되었습니다.");
      navigate(`/`);
    },
    onError: () => {
      alert("문제가 발생했습니다.");
    },
  });
};
