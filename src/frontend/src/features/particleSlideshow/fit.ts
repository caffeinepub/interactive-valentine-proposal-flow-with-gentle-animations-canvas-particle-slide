export interface FittedDimensions {
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export function fitImageToCanvas(
  imageWidth: number,
  imageHeight: number,
  canvasWidth: number,
  canvasHeight: number
): FittedDimensions {
  const imageAspect = imageWidth / imageHeight;
  const canvasAspect = canvasWidth / canvasHeight;
  
  let width: number;
  let height: number;
  
  if (imageAspect > canvasAspect) {
    // Image is wider - fit to width
    width = canvasWidth * 0.8;
    height = width / imageAspect;
  } else {
    // Image is taller - fit to height
    height = canvasHeight * 0.8;
    width = height * imageAspect;
  }
  
  const offsetX = (canvasWidth - width) / 2;
  const offsetY = (canvasHeight - height) / 2;
  
  return { width, height, offsetX, offsetY };
}
