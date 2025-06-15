import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/auth";
import {
  useCheckFriendQuery,
  useCreateFriend,
  useDeleteFriend,
} from "@/hook/friend/useMyFriendQuery";
import { Layout, PageLayout } from "@/components/layout/Layout";
import ProfileCard from "@/components/card/profileCard/ProfileCard";
import VoteResultCard from "@/components/card/voteResultCard/VoteResultCard";
import VoteList from "@/components/List/voteList/VoteList";
import ChevronRight from "@/assets/icon/chevron-right.svg";
import { VoteDetail, VoteResult } from "@/types/vote";
import { UserMbtiProfile } from "@/types/profile";
import ProfileCardActionButton from "@/components/button/profileCardActionButton.tsx/ProfileCardActionButton";
import "./mbtiPageTemplate.scss";

interface MbtiPageTemplateProps {
  profileData: UserMbtiProfile;
  voteResult: VoteResult | null;
  voteList: VoteDetail[];
  isMine: boolean;
}

const MbtiPageTemplate = ({
  profileData,
  voteResult,
  voteList,
  isMine,
}: MbtiPageTemplateProps) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const [showQr, setShowQr] = useState(false);
  const { data: isMyFriend } = useCheckFriendQuery(profileData.userId);

  const { mutate: addFriend } = useCreateFriend();
  const { mutate: removeFriend } = useDeleteFriend();

  const handleAddFriend = () => {
    addFriend(profileData.userId);
  };

  const handleDeleteFriend = () => {
    removeFriend(profileData.userId);
  };

  const handleToggleQr = () => {
    setShowQr((prev) => !prev);
  };

  const actionButton = (
    <ProfileCardActionButton
      mbti={profileData.mbti}
      isMine={isMine}
      isFriend={isMyFriend?.isFriend ?? false}
      showQr={showQr}
      onAddFriend={handleAddFriend}
      onDeleteFriend={handleDeleteFriend}
      onToggleQr={handleToggleQr}
    />
  );

  return (
    <PageLayout className="home-page-layout">
      <Layout>
        {/* 프로필 카드 */}
        <div id="mbti-image-container">
          <section className="home-my-card-layout">
            <ProfileCard
              data={profileData}
              actionButton={actionButton}
              showQr={showQr}
            />
          </section>
          {/* 투표결과 카드 */}
          <section className="home-vote-card-layout">
            <h3 className="home-vote-title f-title2">
              친구들이 생각한 {isMine ? "나의" : `${profileData?.nickname}님의`}{" "}
              MBTI
            </h3>
            <VoteResultCard voteResult={voteResult ?? null} />
          </section>
        </div>

        {/* 방명록 */}
        <section className="home-visitors-container">
          <div className="home-visitors-title-wrapper">
            <h3 className="home-visitors-title f-title2">방명록</h3>

            {!isMine && (
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    alert("로그인이후 가능합니다.");
                    return;
                  }
                  navigate(`/vote/${profileData.userId}/write`);
                }}
                className={`svg-button f-body2`}
              >
                <p className="f-body2">방명록 쓰기</p>
                <img
                  src={ChevronRight}
                  alt="방명록 쓰기"
                  className="arrow-image"
                />
              </button>
            )}
          </div>
          <VoteList voteList={voteList || []} />
        </section>
      </Layout>
    </PageLayout>
  );
};
export default MbtiPageTemplate;
