import React from "react";
import MBTIScoreGraph from "@/components/MBTIScoreGraph/MBTIScoreGraph";
import { getMbtiMiniProfileImage } from "@/utils/getMbtiProfile";
import { getMBTIBGColor } from "@/utils/getMbtiColor";
import { VoteResult } from "@/types/vote";

import "./voteResultCard.scss";

interface VoteResultCardProps {
  voteResult: VoteResult | null;
}
const VoteResultCard = ({ voteResult }: VoteResultCardProps) => {
  if (!voteResult) return null;
  console.log("VoteResultCard 리렌더링");

  return (
    <>
      {voteResult.mbti_result ? (
        <div
          className="mbti-vote-card-container"
          style={{
            background: getMBTIBGColor(voteResult.mbti_result),
          }}
        >
          <div className="title-wrapper">
            <div className="image-wrapper">
              <img
                src={getMbtiMiniProfileImage(voteResult.mbti_result)}
                alt="프로필 이미지"
                className="profile-image"
              />
            </div>
            <h3 className="title-text f-heading3">{voteResult.mbti_result}</h3>
            <p className="subtitle-text f-caption">
              총 {voteResult.total_count}명이 투표했어요!
            </p>
          </div>
          <div className="mbti-score-graph-container">
            <MBTIScoreGraph
              mbti={voteResult.mbti_result}
              ei={voteResult.mbti_ei_score}
              sn={voteResult.mbti_sn_score}
              tf={voteResult.mbti_tf_score}
              jp={voteResult.mbti_jp_score}
            />
          </div>
        </div>
      ) : (
        <div className="no-votes-container">
          <p className="no-votes-text f-body2">
            아직 아무도 투표하지 않았어요!
          </p>
        </div>
      )}
    </>
  );
};

export default React.memo(VoteResultCard);
