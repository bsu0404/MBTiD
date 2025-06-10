import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkFriend,
  createFriend,
  deleteFriend,
  fetchMyFriend,
} from "@/api/friend";
import { CheckFriendRes, MyFriendRes } from "@/types/friend";
// 내 친구 목록 조회
export const useMyFriendQuery = (isLoggedIn: boolean) => {
  return useQuery<MyFriendRes>({
    queryKey: ["MyFriendList"],
    queryFn: fetchMyFriend,
    retry: false,
    enabled: isLoggedIn,
  });
};
// 친구 추가
export const useCreateFriend = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => createFriend(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["MyFriendList"] });
      queryClient.invalidateQueries({ queryKey: ["MyFriend", userId] });
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
      queryClient.invalidateQueries({ queryKey: ["MyFriendList"] });
      queryClient.invalidateQueries({ queryKey: ["MyFriend", userId] });
    },
    onError: (error) => {
      console.error("친구 삭제 실패:", error);
    },
  });
};
// 친구 여부 조회
export const useCheckFriendQuery = (userId: string) => {
  return useQuery<CheckFriendRes>({
    queryKey: ["MyFriend", userId],
    queryFn: () => checkFriend(userId),
    retry: false,
  });
};
