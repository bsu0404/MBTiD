import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth";
import { useMyProfileQuery } from "../../hook/profile/useMyInfoQuery";
import { useMyVoteResultQuery } from "../../hook/vote/useVoteResultQuery";
import { useMyVoteListQuery } from "../../hook/vote/useVoteList";
import MbtiPageTemplate from "@/components/templates/MbtiPageTemplate";
import Loading from "@/components/common/loading/Loading";
import "./home.scss";
import ErrorPage from "../error/ErrorPage";

const Home = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const {
    data: profileData,
    isLoading,
    isError,
  } = useMyProfileQuery(isLoggedIn);
  const { data: voteResult } = useMyVoteResultQuery(isLoggedIn);
  const { data: voteList } = useMyVoteListQuery(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;
  if (isError) return <ErrorPage />;
  if (isLoading || !profileData) {
    return <Loading />;
  }

  return (
    <MbtiPageTemplate
      profileData={profileData}
      voteResult={voteResult ? voteResult.data : null}
      voteList={voteList ? voteList.data : []}
      isMine={true}
    />
  );
};

export default Home;
