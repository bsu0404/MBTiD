import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallow, useShallow } from "zustand/shallow";

import useAuthStore from "@/store/auth";
import { useMyProfileQuery } from "../../hook/profile/useMyInfoQuery";
import { useMyVoteResultQuery } from "../../hook/vote/useVoteResultQuery";
import { useMyVoteListQuery } from "../../hook/vote/useVoteList";
import MbtiPageTemplate from "@/components/templates/MbtiPageTemplate";
import Loading from "@/components/common/loading/Loading";
import ErrorPage from "../error/ErrorPage";
import "./home.scss";

const Home = () => {
  const { isLoggedIn, setUserInfo, userInfo } = useAuthStore();

  const navigate = useNavigate();

  const { data: profileData, isLoading, isError } = useMyProfileQuery();
  const { data: voteResult } = useMyVoteResultQuery(isLoggedIn);
  const { data: voteList } = useMyVoteListQuery(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    // 같은 값이면 업데이트 X => 렌더링 X
    if (profileData && !shallow(profileData, userInfo)) {
      setUserInfo(profileData);
    }
  }, [profileData, userInfo, setUserInfo]);

  if (!isLoggedIn) return null;
  if (isError) return <ErrorPage />;
  if (isLoading || !userInfo) {
    return <Loading />;
  }

  return (
    <MbtiPageTemplate
      profileData={userInfo}
      voteResult={voteResult ? voteResult.data : null}
      voteList={voteList ? voteList.data : []}
      isMine={true}
    />
  );
};

export default Home;
