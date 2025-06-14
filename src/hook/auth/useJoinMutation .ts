import { useMutation, useQueryClient } from "@tanstack/react-query";
import { join } from "@/api/auth";
import { JoinReq } from "@/pages/join/Join";

export const useJoinMutation = () => {
  return useMutation<string, Error, JoinReq>({
    mutationFn: (joinData) => join(joinData),
  });
};
