import { useCallback } from "react";
import { mbtiType } from "@/types/mbti";
import { captureElementWithPadding } from "@/utils/canvas";

export const useDownloadMbtiImage = (mbti: mbtiType) => {
  const handleDownload = useCallback(async () => {
    const target = document.getElementById("mbti-image-container");
    if (!target) {
      alert("이미지 저장에 실패했습니다.");
      return;
    }

    try {
      const canvas = await captureElementWithPadding(target, 32, "white");
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${mbti}.png`;
      link.click();
    } catch (error) {
      alert("이미지 저장 중 오류가 발생했습니다.");
      console.error(error);
    }
  }, [mbti]);

  return { handleDownload };
};
