import OutlineChip from "@/components/outlineChip/OutlineChip";
import OutlineChipGray from "@/components/outlineChipGray/OutlineChipGray";
import { VoteDetail } from "@/types/vote";
import { getMbtiMiniProfileImage } from "@/utils/getMbtiProfile";

import "./voteList.scss";

interface VoteListProps {
  voteList: VoteDetail[];
}

const VoteList = ({ voteList }: VoteListProps) => {
  return (
    <div className="visitors-container">
      {voteList.length > 0 ? (
        <div className="visitors-list">
          {voteList.map((visitor) => (
            <div
              key={`visitor-item${visitor.vote_id}`}
              className="visitor-item"
            >
              <div className="main-section">
                <div className="image-wrapper">
                  <img
                    src={getMbtiMiniProfileImage(visitor.mbti_result)}
                    alt="프로필 이미지"
                    className="profile-image"
                  />
                </div>
                <div className="text-wrapper f-body2">
                  <p className="text f-body2">{visitor.comment}</p>
                </div>
              </div>
              <div className="sub-section">
                <OutlineChip visitorData={visitor} />
                <OutlineChipGray
                  name={
                    visitor.incognito === "Y"
                      ? "익명"
                      : visitor.voting_user_nickname
                  }
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-data-container">
          <p className="no-data-text f-body2">
            아직 아무도 방명록을 쓰지 않았어요!
          </p>
        </div>
      )}
    </div>
  );
};

export default VoteList;
