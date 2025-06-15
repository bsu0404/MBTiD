import { useCallback } from "react";

export const useKakaoShare = (userId: string) => {
  const handleKakaoShare = useCallback(() => {
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
  }, [userId]);
  return { handleKakaoShare };
};
