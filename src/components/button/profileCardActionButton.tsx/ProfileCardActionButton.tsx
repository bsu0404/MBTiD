import html2canvas from "html2canvas";
import { mbtiType } from "@/types/mbti";
import OutlineButton from "../OutlineButton";
import { getMBTIColor } from "@/utils/getMbtiColor";
import SolidButton from "../SolidButton";
import useAuthStore from "@/store/auth";
import "./profileCardActionButton.scss";

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
  const handleKakaoShare = () => {
    if (window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "친구가 생각하는 나의 MBTI는?",
          description: "MBTID로 친구와 나의 MBTI를 비교해보세요!",
          imageUrl: "https://mbtid.winterholic.net/assets/snsImage.jpg",
          link: {
            mobileWebUrl: "https://mbtid.winterholic.net/",
            webUrl: "https://mbtid.winterholic.net/",
          },
        },
        buttons: [
          {
            title: "친구 MBTID 보러가기",
            link: {
              mobileWebUrl: `https://mbtid.winterholic.net/user/${userId}`,
              webUrl: `https://mbtid.winterholic.net/user/${userId}`,
            },
          },
        ],
      });
    }
  };

  const onClickDownloadButton = () => {
    const target = document.getElementById("mbti-image-container");
    if (!target) {
      return alert("사진 저장에 실패했습니다.");
    }

    html2canvas(target).then((canvas) => {
      const target = document.getElementById("mbti-image-container");
      if (!target) {
        return alert("사진 저장에 실패했습니다.");
      }

      html2canvas(target, { backgroundColor: "white" }).then((canvas) => {
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = canvas.toDataURL("image/png");
        link.download = `${mbti}.png`;
        link.click();
        document.body.removeChild(link);
      });
    });
  };

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
          onClick={onClickDownloadButton}
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
