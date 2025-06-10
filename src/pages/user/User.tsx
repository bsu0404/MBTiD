import { useUserVoteResultQuery } from "../../hook/vote/useVoteResultQuery";
import { useUserVoteListQuery } from "../../hook/vote/useVoteList";
import MbtiPageTemplate from "@/components/templates/MbtiPageTemplate";
import { useUserProfileQuery } from "@/hook/profile/useUserInfoQuery";
import { useParams } from "react-router-dom";

import useAuthStore from "@/store/auth";

const USer = () => {
  const { id } = useParams<{ id: string }>();
  const userId = id ?? "";
  const { userId: myId } = useAuthStore();

  const { data: profileData } = useUserProfileQuery(userId);
  const { data: voteResult } = useUserVoteResultQuery(userId);
  const { data: voteList } = useUserVoteListQuery(userId);

  return (
    <MbtiPageTemplate
      profileData={profileData}
      voteResult={voteResult ? voteResult.data : null}
      voteList={voteList ? voteList.data : []}
      isMine={profileData.userId == myId}
    />
  );
};

export default USer;
