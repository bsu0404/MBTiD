import { useNavigate } from "react-router-dom";

import MBTIScoreGraph from "@/components/MBTIScoreGraph/MBTIScoreGraph";
import { getMbtiDescription } from "@/utils/getMbtiDescription";
import { getMbtiImageSrc } from "@/utils/getMbtiProfile";
import { getMBTIBGColor } from "@/utils/getMbtiColor";
import { UserMbtiProfile } from "@/types/profile";
import SolidButton from "@/components/button/SolidButton";
import OutlineButton from "@/components/button/OutlineButton";
import "./myMbtiSettingsCard.scss";

interface MyMbtiSettingCardProps {
  data: UserMbtiProfile;
  onLogout: () => void;
}
const MyMbtiSettingCard = ({ data, onLogout }: MyMbtiSettingCardProps) => {
  const image = getMbtiImageSrc(data?.mbti);
  const navigate = useNavigate();

  return (
    <div
      className="setting-card-container"
      style={{ background: getMBTIBGColor(data.mbti) }}
    >
      <div className="img-wrapper">
        <img
          src={image}
          alt={`${data?.mbti}프로필 이미지`}
          className="mbti-image"
        />
      </div>
      <div className="mbti-data-container">
        <div className="mbti-title f-title1">{data.mbti}</div>
        <div className="mbti-subtitle f-body2">
          {getMbtiDescription(data.mbti)}
        </div>
        <div className="mbti-score-graph-container">
          <MBTIScoreGraph
            mbti={data.mbti}
            ei={data.mbti_ei_score}
            sn={data.mbti_sn_score}
            tf={data.mbti_tf_score}
            jp={data.mbti_pj_score}
          />
        </div>
      </div>
      <div className="buttons-container">
        <SolidButton
          size={"large"}
          type={"button"}
          onClick={() => {
            navigate(`/setting/mbti`);
          }}
        >
          MBTI 수정하기
        </SolidButton>
        <OutlineButton
          size={"large"}
          type={"button"}
          onClick={() => {
            navigate(`/setting/nickname`);
          }}
        >
          닉네임 수정하기
        </OutlineButton>
        <button className="logout-button f-body2 " onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyMbtiSettingCard;
