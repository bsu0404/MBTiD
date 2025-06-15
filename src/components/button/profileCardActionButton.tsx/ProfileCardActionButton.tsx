import { mbtiType } from "@/types/mbti";
import OutlineButton from "../OutlineButton";
import { getMBTIColor } from "@/utils/getMbtiColor";
import SolidButton from "../SolidButton";
import useAuthStore from "@/store/auth";
import "./profileCardActionButton.scss";
import { useDownloadMbtiImage } from "@/hook/client/useDownloadMbtiImage";
import { useKakaoShare } from "@/hook/client/useKakaoShare";

interface ProfileCardActionButtonProps {
  mbti: mbtiType;
  isMine: boolean;
  isFriend: boolean;
  showQr: boolean;
  onAddFriend: () => void;
  onDeleteFriend: () => void;
  onToggleQr: () => void;
}

const ProfileCardActionButton = ({
  mbti,
  isMine,
  isFriend,
  onAddFriend,
  onDeleteFriend,
  onToggleQr,
  showQr,
}: ProfileCardActionButtonProps) => {
  const { userId } = useAuthStore();

  const { handleDownload } = useDownloadMbtiImage(mbti);
  const { handleKakaoShare } = useKakaoShare(userId ?? "");

  if (isMine) {
    return (
      <div className="button-wrapper" data-html2canvas-ignore="true">
        <OutlineButton
          size="small"
          onClick={onToggleQr}
          type={"button"}
          color={getMBTIColor(mbti)}
        >
          {showQr ? "내 MBTI보기" : "QR 보기"}
        </OutlineButton>
        <SolidButton
          size="small"
          onClick={handleKakaoShare}
          type={"button"}
          color={getMBTIColor(mbti)}
        >
          공유
        </SolidButton>
        <SolidButton
          size="small"
          onClick={handleDownload}
          type={"button"}
          color={getMBTIColor(mbti)}
        >
          저장
        </SolidButton>
      </div>
    );
  }

  return isFriend ? (
    <OutlineButton
      size="small"
      onClick={onDeleteFriend}
      type={"button"}
      color={getMBTIColor(mbti)}
    >
      보관 취소하기
    </OutlineButton>
  ) : (
    <OutlineButton
      size="small"
      onClick={onAddFriend}
      type={"button"}
      color={getMBTIColor(mbti)}
    >
      친구의 MBTiD 보관하기
    </OutlineButton>
  );
};

export default ProfileCardActionButton;
