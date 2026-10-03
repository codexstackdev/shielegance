"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download } from "lucide-react";

interface QRgeneratorProps {
  url: string;
  size?: number;
  fileName?: string;
  image?: string;
  message?: string;
}

const loadImage = (source: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });

const drawHeartFallback = (
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  size: number,
) => {
  const x = centerX - size / 2;
  const y = centerY - size / 2;

  context.beginPath();
  context.moveTo(centerX, y + size * 0.92);
  context.bezierCurveTo(
    x + size * 0.08,
    y + size * 0.62,
    x,
    y + size * 0.3,
    x + size * 0.2,
    y + size * 0.14,
  );
  context.bezierCurveTo(
    x + size * 0.34,
    y,
    x + size * 0.47,
    y + size * 0.12,
    centerX,
    y + size * 0.3,
  );
  context.bezierCurveTo(
    x + size * 0.53,
    y + size * 0.12,
    x + size * 0.66,
    y,
    x + size * 0.8,
    y + size * 0.14,
  );
  context.bezierCurveTo(
    x + size,
    y + size * 0.3,
    x + size * 0.92,
    y + size * 0.62,
    centerX,
    y + size * 0.92,
  );
  context.closePath();
  context.fillStyle = "#7A3B46";
  context.fill();
};

const drawCenterImage = async (
  context: CanvasRenderingContext2D,
  imageSource: string | undefined,
  size: number,
) => {
  const logoSize = size * 0.17;
  const center = size / 2;
  const padding = size * 0.035;
  const boxSize = logoSize + padding * 2;
  const boxX = center - boxSize / 2;
  const boxY = center - boxSize / 2;

  context.save();
  context.fillStyle = "#FFFDFD";
  context.beginPath();
  context.roundRect(boxX, boxY, boxSize, boxSize, size * 0.025);
  context.fill();
  context.strokeStyle = "#F4D7DD";
  context.lineWidth = Math.max(1.5, size * 0.006);
  context.stroke();

  if (imageSource) {
    try {
      const image = await loadImage(imageSource);
      context.save();
      context.beginPath();
      context.arc(center, center, logoSize / 2, 0, Math.PI * 2);
      context.clip();

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      const ratio = Math.max(logoSize / image.width, logoSize / image.height);
      const width = image.width * ratio;
      const height = image.height * ratio;
      context.drawImage(image, center - width / 2, center - height / 2, width, height);
      context.restore();
    } catch {
      drawHeartFallback(context, center, center, logoSize * 0.82);
    }
  } else {
    drawHeartFallback(context, center, center, logoSize * 0.82);
  }

  context.restore();
};

const QRgenerator = ({
  url,
  size = 280,
  fileName = "shielegance-qr",
  image,
  message = "You have received a personalized digital surprise.",
}: QRgeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas || !url) return;

    const renderQr = async () => {
      setIsReady(false);

      canvas.width = size;
      canvas.height = size;

      await QRCode.toCanvas(canvas, url, {
        width: size,
        margin: 4,
        errorCorrectionLevel: "H",
        color: {
          dark: "#7A3B46",
          light: "#FFFDFD",
        },
      });

      if (cancelled) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      await drawCenterImage(context, image, size);
      if (!cancelled) setIsReady(true);
    };

    renderQr();

    return () => {
      cancelled = true;
    };
  }, [image, size, url]);

  const handleDownload = async () => {
    if (!isReady || !url) return;


    const exportQrSize = 1200; 
    const scale = 4;
    
    const cardWidth = (exportQrSize + 64 * scale);
    const cardHeight = (exportQrSize + 220 * scale); 

    const downloadCard = document.createElement("canvas");
    downloadCard.width = cardWidth;
    downloadCard.height = cardHeight;
    const context = downloadCard.getContext("2d");
    if (!context) return;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, cardWidth, cardHeight);

    const gradient = context.createLinearGradient(0, 0, cardWidth, cardHeight);
    gradient.addColorStop(0, "#FFFDFD");
    gradient.addColorStop(1, "#FFF5F7");
    context.fillStyle = gradient;
    context.fillRect(0, 0, cardWidth, cardHeight);

    const scratchCanvas = document.createElement("canvas");
    await QRCode.toCanvas(scratchCanvas, url, {
      width: exportQrSize,
      margin: 4,
      errorCorrectionLevel: "H",
      color: {
        dark: "#7A3B46",
        light: "#FFFDFD",
      },
    });

    const scratchContext = scratchCanvas.getContext("2d");
    if (scratchContext) {
      scratchContext.imageSmoothingEnabled = true;
      scratchContext.imageSmoothingQuality = "high";
      await drawCenterImage(scratchContext, image, exportQrSize);
    }

    const qrX = (cardWidth - exportQrSize) / 2;
    const qrY = 32 * scale;

    context.drawImage(scratchCanvas, qrX, qrY, exportQrSize, exportQrSize);

    context.strokeStyle = "#F1D9DE";
    context.lineWidth = 2 * scale;
    context.strokeRect(
      qrX - 10 * scale, 
      qrY - 10 * scale, 
      exportQrSize + 20 * scale, 
      exportQrSize + 20 * scale
    );

    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillStyle = "#7A3B46";
    context.font = `600 ${16 * scale}px Georgia, serif`;
    context.fillText(message, cardWidth / 2, qrY + exportQrSize + 44 * scale, cardWidth - 48 * scale);

    context.fillStyle = "#A97984";
    context.font = `500 ${11 * scale}px Arial, sans-serif`;
    context.fillText("Scan the QR code to open your dedication.", cardWidth / 2, qrY + exportQrSize + 74 * scale, cardWidth - 48 * scale);

    context.fillStyle = "#7A3B46";
    context.font = `600 ${10 * scale}px Arial, sans-serif`;
    context.fillText("Created with shielegance.vercel.app", cardWidth / 2, qrY + exportQrSize + 130 * scale, cardWidth - 48 * scale);


    const link = document.createElement("a");
    link.download = `${fileName}-polaroid.png`;
    link.href = downloadCard.toDataURL("image/png", 1.0);
    link.click();
  };

  return (
    <section className="flex w-full min-w-0 flex-col gap-3 rounded-[1.5rem] border border-primary/15 bg-card p-3 text-card-foreground shadow-lg shadow-primary/10 sm:p-4">
      <div className="flex w-full min-w-0 items-center justify-center overflow-hidden rounded-[1rem] border border-primary/15 bg-secondary/35 p-2">
        <canvas
          ref={canvasRef}
          className="block h-auto w-full max-w-70 rounded-lg pointer-events-none"
          style={{ aspectRatio: "1 / 1" }}
        />
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={!isReady}
        className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Download className="size-4" />
        Download QR
      </button>
    </section>
  );
};

export default QRgenerator;
