/**
 * Compresses and resizes an image while preserving aspect ratio.
 * Fits the image inside a maxWidth × maxHeight bounding box.
 * Preserves PNG transparency.
 */
export function compressImage(
  file: File,
  maxWidth = 512,
  maxHeight = 512,
  quality = 0.8,
): Promise<File> {
  return new Promise((resolve) => {
    // Not an image
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }

    // Already small enough
    if (file.size <= 200 * 1024) {
      resolve(file);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let { width, height } = img;

        const scale = Math.min(
          maxWidth / width,
          maxHeight / height,
          1, // never upscale
        );

        width = Math.round(width * scale);
        height = Math.round(height * scale);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(file);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        const outputType =
          file.type === "image/png" ? "image/png" : "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }

            resolve(
              new File([blob], file.name, {
                type: outputType,
                lastModified: Date.now(),
              }),
            );
          },
          outputType,
          quality,
        );
      };

      img.onerror = () => resolve(file);
      img.src = event.target?.result as string;
    };

    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
