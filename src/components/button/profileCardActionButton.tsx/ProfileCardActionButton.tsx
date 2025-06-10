import { mbtiType } from "@/types/mbti";
import OutlineButton from "../OutlineButton";
import { getMBTIColor } from "@/utils/getMbtiColor";

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
  if (isMine) {
    return (
      <OutlineButton
        size="small"
        onClick={onToggleQr}
        type={"button"}
        color={getMBTIColor(mbti)}
      >
        {showQr ? "내 MBTI보기" : "QR 보기"}
      </OutlineButton>
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
    <OutlineButton size="small" onClick={onAddFriend} type={"button"}>
      친구의 MBTiD 보관하기
    </OutlineButton>
  );
};

export default ProfileCardActionButton;
