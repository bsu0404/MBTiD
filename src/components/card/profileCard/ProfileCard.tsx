import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import MBTIScoreGraph from "@/components/MBTIScoreGraph/MBTIScoreGraph";
import OutlineButton from "@/components/button/OutlineButton";
import { getMbtiDescription } from "@/utils/getMbtiDescription";
import { getMbtiImageSrc } from "@/utils/getMbtiProfile";
import { getMBTIBGColor } from "@/utils/getMbtiColor";
import { UserMbtiProfile } from "@/types/profile";
import "./profileCard.scss";

interface ProfileCardProps {
  data: UserMbtiProfile;
  actionButton?: React.ReactNode;
  showQr?: boolean;
}
const ProfileCard = ({
  data,
  actionButton,
  showQr = false,
}: ProfileCardProps) => {
  const currentUrl = window.location.href;

  const image = getMbtiImageSrc(data?.mbti);

  return (
    <div
      className="mbti-card-container"
      style={{ background: getMBTIBGColor(data.mbti) }}
    >
      <div className="title-wrapper">
        <h3 className="f-title2">{data?.nickname}의 MBTiD</h3>
        {actionButton}
      </div>
      <div className="img-wrapper">
        {showQr ? (
          <div className="mbti-image">
            <QRCodeCanvas value={currentUrl} size={80} />
          </div>
        ) : (
          <img
            src={image}
            alt={`${data?.mbti}프로필 이미지`}
            className="mbti-image"
          />
        )}
      </div>
      <div className="mbti-data-container">
        <div className="mbti-title f-title1">{data.mbti}</div>
        <div className="mbti-subtitle f-body2">
          {getMbtiDescription(data.mbti)}
        </div>
        <MBTIScoreGraph
          mbti={data.mbti}
          ei={data.mbti_ei_score}
          sn={data.mbti_sn_score}
          tf={data.mbti_tf_score}
          jp={data.mbti_pj_score}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
