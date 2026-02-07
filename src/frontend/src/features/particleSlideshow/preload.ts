export async function preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
  const promises = urls.map(url => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      
      img.src = url;
    });
  });

  return Promise.all(promises);
}
