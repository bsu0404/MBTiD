import MBTIScoreGraph from "@/components/MBTIScoreGraph/MBTIScoreGraph";
import { getMbtiMiniProfileImage } from "@/utils/getMbtiProfile";
import { getMBTIBGColor } from "@/utils/getMbtiColor";
import { FriendData } from "@/types/friend";
import "./friendCard.scss";
import OutlineButton from "@/components/button/OutlineButton";
import { useNavigate } from "react-router-dom";

interface FriendCardProps {
  friendData: FriendData;
}
const FriendCard = ({ friendData }: FriendCardProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="mbti-friend-card-container"
        style={{
          background: getMBTIBGColor(friendData.mbti),
        }}
      >
        <div>
          <div className="head-wrapper">
            <div className="title-wrapper">
              <div className="image-wrapper">
                <img
                  src={getMbtiMiniProfileImage(friendData.mbti)}
                  alt="프로필 이미지"
                  className="profile-image"
                />
              </div>
              <h3 className="title-text f-heading3">{friendData.nickname}</h3>
              <h3 className="title-text f-heading3">/</h3>
              <h3 className="title-text f-heading3">{friendData.mbti}</h3>
            </div>
            <OutlineButton
              size={"small"}
              type={"button"}
              onClick={() => navigate(`/user/${friendData.user_id}`)}
            >
              MBTI 보러가기
            </OutlineButton>
          </div>
        </div>

        <MBTIScoreGraph
          mbti={friendData.mbti}
          ei={friendData.mbti_ei_score}
          sn={friendData.mbti_sn_score}
          tf={friendData.mbti_tf_score}
          jp={friendData.mbti_pj_score}
        />
      </div>
    </>
  );
};

export default FriendCard;
