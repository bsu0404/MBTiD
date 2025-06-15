import html2canvas from "html2canvas";
// 이미지에 패딩 추가
export const captureElementWithPadding = async (
  element: HTMLElement,
  padding = 32,
  backgroundColor = "white"
): Promise<HTMLCanvasElement> => {
  const originalCanvas = await html2canvas(element, { backgroundColor });

  const newCanvas = document.createElement("canvas");
  newCanvas.width = originalCanvas.width + padding * 2;
  newCanvas.height = originalCanvas.height + padding * 2;

  const ctx = newCanvas.getContext("2d");
  if (!ctx) throw new Error("error");

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
  ctx.drawImage(originalCanvas, padding, padding);

  return newCanvas;
};
