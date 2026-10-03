"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Download, Heart, ImagePlus, Sparkles } from "lucide-react";

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
  context.lineWidth = Math.max(1, size * 0.006);
  context.stroke();

  if (imageSource) {
    try {
      const image = await loadImage(imageSource);
      context.save();
      context.beginPath();
      context.arc(center, center, logoSize / 2, 0, Math.PI * 2);
      context.clip();
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
  message = "A little love is waiting for you.",
}: QRgeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas || !url) return;

    const renderQr = async () => {
      setIsReady(false);

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

  const handleDownload = () => {
    const qrCanvas = canvasRef.current;
    if (!qrCanvas || !isReady) return;

    const scale = 2;
    const cardWidth = (size + 64) * scale;
    const cardHeight = (size + 188) * scale;
    const card = document.createElement("canvas");
    card.width = cardWidth;
    card.height = cardHeight;
    const context = card.getContext("2d");
    if (!context) return;

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, cardWidth, cardHeight);

    const gradient = context.createLinearGradient(0, 0, cardWidth, cardHeight);
    gradient.addColorStop(0, "#FFFDFD");
    gradient.addColorStop(1, "#FFF5F7");
    context.fillStyle = gradient;
    context.fillRect(0, 0, cardWidth, cardHeight);

    const qrX = (cardWidth - size * scale) / 2;
    const qrY = 32 * scale;
    context.drawImage(qrCanvas, qrX, qrY, size * scale, size * scale);

    context.strokeStyle = "#F1D9DE";
    context.lineWidth = 2 * scale;
    context.strokeRect(qrX - 10 * scale, qrY - 10 * scale, size * scale + 20 * scale, size * scale + 20 * scale);

    context.textAlign = "center";
    context.fillStyle = "#7A3B46";
    context.font = `600 ${16 * scale}px Georgia, serif`;
    context.fillText(message, cardWidth / 2, (size + 84) * scale, cardWidth - 48 * scale);

    context.fillStyle = "#A97984";
    context.font = `500 ${10 * scale}px Arial, sans-serif`;
    context.fillText("Scan to open something made with love", cardWidth / 2, (size + 112) * scale, cardWidth - 48 * scale);

    context.fillStyle = "#7A3B46";
    context.font = `600 ${10 * scale}px Arial, sans-serif`;
    context.fillText("powered by shielegance.vercel.app", cardWidth / 2, (size + 160) * scale, cardWidth - 48 * scale);

    const link = document.createElement("a");
    link.download = `${fileName}-polaroid.png`;
    link.href = card.toDataURL("image/png");
    link.click();
  };

  return (
    <section className="relative flex w-full max-w-xs flex-col items-center overflow-hidden rounded-[2rem] border border-primary/20 bg-card p-6 text-card-foreground shadow-xl shadow-primary/10">
      <div aria-hidden="true" className="absolute -right-12 -top-14 size-40 rounded-full bg-accent/35 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-16 -left-12 size-40 rounded-full bg-secondary/60 blur-3xl" />

      <div className="relative z-10 text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Sparkles className="size-3.5" />
          A little surprise
          <Sparkles className="size-3.5" />
        </p>
        <h2 className="font-heading mt-3 text-2xl font-semibold tracking-tight">
          Scan to open
        </h2>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          A love note is waiting on the other side.
        </p>
      </div>

      <div className="relative z-10 my-6 rounded-[1.5rem] bg-secondary/45 p-3 shadow-inner">
        <div className="rounded-[1rem] border-4 border-primary/15 bg-card p-2 shadow-lg">
          <canvas ref={canvasRef} className="block max-w-full rounded-lg" />
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 rounded-full border border-primary/15 bg-secondary/45 px-4 py-2 text-xs text-muted-foreground">
       <Heart className="size-3.5 fill-primary text-primary" />
        Made with love
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={!isReady}
        className="relative z-10 mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Download className="size-4" />
        Download QR
      </button>
    </section>
  );
};

export default QRgenerator;
