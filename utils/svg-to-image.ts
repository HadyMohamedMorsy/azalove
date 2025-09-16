/**
 * Converts SVG element to image (Blob)
 */
export function svgToImage(
  svgElement: SVGElement,
  options: {
    width?: number;
    height?: number;
    format?: "png" | "jpeg" | "webp";
    quality?: number;
  } = {}
): Promise<Blob> {
  const { width = 800, height = 600, format = "png", quality = 0.9 } = options;

  return new Promise((resolve, reject) => {
    try {
      // Clone the SVG element to avoid modifying the original
      const clonedSvg = svgElement.cloneNode(true) as SVGElement;

      // Get original dimensions and viewBox
      const originalWidth = clonedSvg.getAttribute("width");
      const originalHeight = clonedSvg.getAttribute("height");
      const originalViewBox = clonedSvg.getAttribute("viewBox");

      // Calculate proper dimensions maintaining aspect ratio
      let finalWidth = width;
      let finalHeight = height;

      if (originalViewBox) {
        const viewBoxValues = originalViewBox.split(/\s+/);
        const vbWidth = parseFloat(viewBoxValues[2]);
        const vbHeight = parseFloat(viewBoxValues[3]);

        if (vbWidth && vbHeight) {
          const aspectRatio = vbWidth / vbHeight;
          if (aspectRatio > width / height) {
            // SVG is wider than target ratio
            finalHeight = width / aspectRatio;
          } else {
            // SVG is taller than target ratio
            finalWidth = height * aspectRatio;
          }
        }
      } else if (originalWidth && originalHeight) {
        const aspectRatio =
          parseFloat(originalWidth) / parseFloat(originalHeight);
        if (aspectRatio > width / height) {
          finalHeight = width / aspectRatio;
        } else {
          finalWidth = height * aspectRatio;
        }
      }

      // Set dimensions and viewBox
      clonedSvg.setAttribute("width", finalWidth.toString());
      clonedSvg.setAttribute("height", finalHeight.toString());

      // Preserve original viewBox or create one
      if (originalViewBox) {
        clonedSvg.setAttribute("viewBox", originalViewBox);
      } else {
        clonedSvg.setAttribute("viewBox", `0 0 ${finalWidth} ${finalHeight}`);
      }

      // Ensure proper scaling
      clonedSvg.setAttribute("preserveAspectRatio", "xMidYMid meet");

      // Convert SVG to string
      const svgString = new XMLSerializer().serializeToString(clonedSvg);

      // Create data URL
      const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

      // Create canvas with proper dimensions
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Set canvas size to target dimensions
      canvas.width = width;
      canvas.height = height;

      // Set white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Create image element
      const img = new Image();

      img.onload = () => {
        try {
          // Calculate position to center the image
          const x = (width - finalWidth) / 2;
          const y = (height - finalHeight) / 2;

          // Draw image on canvas centered
          ctx.drawImage(img, x, y, finalWidth, finalHeight);

          // Convert canvas to blob
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Failed to convert canvas to blob"));
              }
            },
            `image/${format}`,
            quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error("Failed to load SVG image"));
      };

      img.src = svgDataUrl;
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Converts multiple SVG elements to images
 */
export async function svgsToImages(
  svgElements: SVGElement[],
  options: {
    width?: number;
    height?: number;
    format?: "png" | "jpeg" | "webp";
    quality?: number;
  } = {}
): Promise<Blob[]> {
  const promises = svgElements.map((svg) => svgToImage(svg, options));
  return Promise.all(promises);
}

/**
 * Converts Blob to File
 */
export function blobToFile(blob: Blob, filename: string): File {
  return new File([blob], filename, { type: blob.type });
}
