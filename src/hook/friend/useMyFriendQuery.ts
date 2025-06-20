import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkFriend,
  createFriend,
  deleteFriend,
  fetchMyFriend,
} from "@/api/friend";
import { MyFriendRes } from "@/types/friend";
import useAuthStore from "@/store/auth";
// 내 친구 목록 조회
export const useMyFriendQuery = (isLoggedIn: boolean) => {
  return useQuery<MyFriendRes>({
    queryKey: ["myFriendList"],
    queryFn: fetchMyFriend,
    retry: false,
    staleTime: 30 * 60 * 1000, // 30분동안 유효
    gcTime: 60 * 60 * 1000, // 1시간동안 유효
    enabled: isLoggedIn,
  });
};
// 친구 추가
export const useCreateFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => createFriend(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["myFriendList"] });
      queryClient.setQueryData(["myFriend", userId], true);
    },
    onError: (error) => {
      console.error("친구 추가 실패:", error);
    },
  });
};
// 친구 삭제
export const useDeleteFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteFriend(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["myFriendList"] });
      queryClient.setQueryData(["myFriend", userId], false);
    },
    onError: (error) => {
      console.error("친구 삭제 실패:", error);
    },
  });
};
// 친구 여부 조회
export const useCheckFriendQuery = (userId: string) => {
  const { userInfo } = useAuthStore();
  return useQuery<boolean>({
    queryKey: ["myFriend", userId],
    queryFn: () => checkFriend(userId),
    retry: false,
    staleTime: 30 * 60 * 1000, // 30분동안 유효
    gcTime: 60 * 60 * 1000, // 1시간동안 유효
    // 내 id인 경우 조회 x
    enabled: userInfo?.userId !== userId,
  });
};
