"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Flower2, Heart, Leaf, Moon, Sparkles, Sun } from "lucide-react";
import { motion } from "motion/react";
import Footer from "@/app/components/Footer";
import { useTheme } from "next-themes";
import { FontId, LetterData, TemplateId } from "@/hooks/types";
import { getLetter } from "@/hooks/actions";
import { toast } from "sonner";

const fontVariables: Record<FontId, string> = {
  cormorant: "--font-cormorant",
  ballet: "--font-ballet",
  playfair: "--font-playfair",
  lora: "--font-lora",
};

const templateStyles: Record<
  TemplateId,
  { className: string; previewClassName: string; ornament: string }
> = {
  ribbon: {
    className: "bg-secondary/55 text-secondary-foreground",
    previewClassName: "rounded-[2rem] border-primary/30",
    ornament: "✦",
  },
  velvet: {
    className: "bg-foreground text-background",
    previewClassName: "rounded-[1rem] border-foreground",
    ornament: "♡",
  },
  paper: {
    className: "bg-card text-card-foreground",
    previewClassName: "rounded-none border-dashed",
    ornament: "❧",
  },
  postcard: {
    className: "bg-accent/45 text-accent-foreground",
    previewClassName: "rounded-[0.75rem] border-primary/25",
    ornament: "♥",
  },
};

const flowerPositions = [
  {
    left: "7%",
    top: "29%",
    size: "size-16",
    delay: 0.02,
    rotate: -18,
    color: "bg-secondary",
  },
  {
    left: "16%",
    top: "18%",
    size: "size-20",
    delay: 0.1,
    rotate: -8,
    color: "bg-card",
  },
  {
    left: "26%",
    top: "8%",
    size: "size-16",
    delay: 0.18,
    rotate: 12,
    color: "bg-accent",
  },
  {
    left: "38%",
    top: "15%",
    size: "size-24",
    delay: 0.03,
    rotate: -4,
    color: "bg-secondary",
  },
  {
    left: "50%",
    top: "3%",
    size: "size-24",
    delay: 0.14,
    rotate: 6,
    color: "bg-card",
  },
  {
    left: "63%",
    top: "10%",
    size: "size-20",
    delay: 0.24,
    rotate: -10,
    color: "bg-accent",
  },
  {
    left: "76%",
    top: "17%",
    size: "size-16",
    delay: 0.07,
    rotate: 16,
    color: "bg-secondary",
  },
  {
    left: "87%",
    top: "28%",
    size: "size-20",
    delay: 0.2,
    rotate: 9,
    color: "bg-card",
  },
  {
    left: "20%",
    top: "35%",
    size: "size-14",
    delay: 0.27,
    rotate: 8,
    color: "bg-accent",
  },
  {
    left: "34%",
    top: "31%",
    size: "size-16",
    delay: 0.08,
    rotate: -14,
    color: "bg-card",
  },
  {
    left: "66%",
    top: "30%",
    size: "size-16",
    delay: 0.18,
    rotate: 10,
    color: "bg-secondary",
  },
  {
    left: "80%",
    top: "37%",
    size: "size-14",
    delay: 0.3,
    rotate: -12,
    color: "bg-accent",
  },
];

const petalPositions = [
  { left: "8%", top: "15%", delay: 0.1, duration: 3.8, rotate: 18 },
  { left: "18%", top: "58%", delay: 0.5, duration: 4.2, rotate: -24 },
  { left: "31%", top: "5%", delay: 0.8, duration: 3.5, rotate: 32 },
  { left: "44%", top: "48%", delay: 0.2, duration: 4.4, rotate: -12 },
  { left: "57%", top: "14%", delay: 0.7, duration: 3.9, rotate: 26 },
  { left: "70%", top: "55%", delay: 0.4, duration: 4.1, rotate: -30 },
  { left: "84%", top: "9%", delay: 0.9, duration: 3.7, rotate: 20 },
  { left: "92%", top: "49%", delay: 0.3, duration: 4.3, rotate: -18 },
  { left: "5%", top: "76%", delay: 0.6, duration: 4, rotate: 22 },
  { left: "90%", top: "78%", delay: 0.15, duration: 3.6, rotate: -26 },
];

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const page = () => {
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [letter, setLetter] = useState<LetterData | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getLetter(params.id);
        if (data.success) {
          setLetter(data.getLetter);
          setIsLoading(false);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [params.id]);
  
  const activeLetter = letter;
  if(!activeLetter) return null;
  const activeStyle = templateStyles[activeLetter.selectedTemplate];
  const fontVariable = fontVariables[activeLetter.selectedFont];

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 size-96 rounded-full bg-secondary/60 blur-3xl" />
        <div className="absolute -bottom-48 -right-40 size-112 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 size-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? "auto" : "none",
        }}
        transition={{ opacity: { delay: isLoading ? 0 : 1.25, duration: 0.8 } }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background"
      >
        <motion.div
          initial={{ y: 0, scale: 1, opacity: 1 }}
          animate={{
            y: isLoading ? 0 : "-115vh",
            scale: isLoading ? 1 : 0.92,
            opacity: isLoading ? 1 : 0,
          }}
          transition={{
            delay: isLoading ? 0 : 0.1,
            duration: 1.25,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="relative flex h-full w-full max-w-3xl flex-col items-center justify-center px-5"
        >
          <div className="relative h-96 w-full max-w-2xl sm:h-120">
            {petalPositions.map((petal, index) => (
              <motion.span
                key={`petal-${index}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.25, 0.9, 0.25],
                  scale: [0.8, 1, 0.8],
                  y: [0, -18, 0],
                  rotate: [petal.rotate, petal.rotate + 22, petal.rotate],
                }}
                transition={{
                  delay: petal.delay,
                  duration: petal.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute z-20 flex size-4 items-center justify-center rounded-full bg-primary/55 text-primary/50"
                style={{ left: petal.left, top: petal.top }}
              >
                <Heart className="size-3 fill-current" />
              </motion.span>
            ))}

            {flowerPositions.map((flower, index) => (
              <motion.div
                key={`flower-${index}`}
                initial={{ opacity: 0, y: 26, scale: 0.65 }}
                animate={{
                  opacity: 1,
                  y: [0, -7, 0],
                  scale: 1,
                  rotate: [flower.rotate, flower.rotate + 3, flower.rotate],
                }}
                transition={{
                  opacity: { delay: flower.delay, duration: 0.5 },
                  scale: {
                    delay: flower.delay,
                    duration: 0.7,
                    ease: "backOut",
                  },
                  y: {
                    delay: flower.delay + 0.6,
                    duration: 3.2 + index * 0.08,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    delay: flower.delay + 0.6,
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="absolute z-10"
                style={{ left: flower.left, top: flower.top }}
              >
                <div
                  className={`flex ${flower.size} items-center justify-center rounded-full border-4 border-primary/25 ${flower.color} text-primary shadow-lg shadow-primary/10`}
                >
                  <Flower2 className="size-3/5 fill-current" />
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{
                opacity: { delay: 0.25, duration: 0.8 },
                y: {
                  delay: 1,
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="absolute bottom-1 left-1/2 z-30 flex -translate-x-1/2 items-end justify-center"
            >
              <div className="absolute bottom-0 h-44 w-5 rotate-[-9deg] rounded-full bg-primary/60 sm:h-56" />
              <div className="absolute bottom-0 h-48 w-5 rotate-[8deg] rounded-full bg-primary/50 sm:h-64" />
              <div className="absolute bottom-0 h-40 w-4 rotate-[-22deg] rounded-full bg-primary/45 sm:h-52" />
              <div className="absolute bottom-0 h-40 w-4 rotate-23 rounded-full bg-primary/45 sm:h-52" />
              <div className="absolute bottom-8 -left-12 text-primary/75 sm:-left-24">
                <Leaf className="size-16 rotate-35 fill-current sm:size-24" />
              </div>
              <div className="absolute bottom-10 -right-12 text-primary/75 sm:-right-24">
                <Leaf className="size-16 rotate-[-35deg] fill-current sm:size-24" />
              </div>
              <div className="relative flex size-32 items-center justify-center rounded-full border-4 border-primary/30 bg-card text-primary shadow-2xl sm:size-40">
                <Flower2 className="size-20 fill-card sm:size-24" />
              </div>
              <div className="absolute -bottom-1 h-8 w-48 rounded-[50%] bg-foreground/10 blur-lg sm:w-72" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="relative z-40 -mt-8 text-center sm:-mt-2"
          >
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              <Sparkles className="size-3.5" />
              Shielegance
            </p>
            <h1 className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A bouquet of love is blooming
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Unwrapping something written just for you...
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 24 : 0 }}
        transition={{
          delay: isLoading ? 0 : 1.05,
          duration: 0.85,
          ease: "easeOut",
        }}
        className="relative mx-auto flex min-h-svh w-full max-w-4xl flex-col px-5 sm:px-8"
      >
        <header className="flex items-center justify-center gap-2 py-7 sm:py-10">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Heart className="size-4 fill-current" />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              shielegance
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
            aria-label="Toggle dark mode"
            aria-pressed="false"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {theme === "light" ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
          </button>
        </header>

        <section className="pb-12 pt-8 text-center sm:pb-16 sm:pt-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.7 : 1 }}
            transition={{ duration: 0.7 }}
            className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-secondary text-primary shadow-sm"
          >
            <Heart className="size-6 fill-current" />
          </motion.div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            A letter written for you
          </p>
          <h1 className="font-heading mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tighter sm:text-6xl">
            Dear {activeLetter.recipient || "someone special"}
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            Someone took the time to turn their feelings into words just for
            you.
          </p>
        </section>

        <section className="mx-auto w-full max-w-3xl pb-16">
          <motion.article
            style={{ fontFamily: `var(${fontVariable})` }}
            initial={{ opacity: 0, y: 55, rotate: -2 }}
            animate={{
              opacity: isLoading ? 0 : 1,
              y: isLoading ? 55 : 0,
              rotate: isLoading ? -2 : 0,
            }}
            transition={{
              delay: isLoading ? 0 : 1.2,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative overflow-hidden border p-7 shadow-2xl shadow-foreground/10 sm:p-12 ${activeStyle.className} ${activeStyle.previewClassName}`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-55"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0, transparent 2.15rem, color-mix(in oklab, var(--border) 62%, transparent) 2.2rem, transparent 2.25rem)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-2 bg-secondary/50 sm:w-3"
            />
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-9 border-l border-primary/20 sm:left-14"
            />
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 size-14 border-b border-l border-border bg-muted/45 [clip-path:polygon(0_0,100%_100%,0_100%)]"
            />

            <div className="relative pl-3 sm:pl-1">
              <div className="mb-10 flex items-start justify-between border-b border-current/15 pb-5 sm:mb-12">
                <div>
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 fill-primary text-primary" />
                    <span className="text-lg font-semibold tracking-tight">
                      shielegance
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-50">
                    A letter from the heart
                  </p>
                </div>
                <div className="flex size-11 shrink-0 rotate-3 items-center justify-center border border-primary/30 bg-secondary/45 text-primary sm:size-14">
                  <div className="flex size-8 items-center justify-center border border-dashed border-primary/50 sm:size-10">
                    <Heart className="size-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="mb-10 text-right text-xs italic opacity-55">
                {formatDate(activeLetter.createdAt)}
              </p>
              <div className="space-y-8">
                <p className="text-3xl leading-tight sm:text-4xl">
                  Dear{" "}
                  <span className="text-primary">
                    {activeLetter.recipient || "someone special"}
                  </span>
                  ,
                </p>
                <p className="max-w-prose whitespace-pre-wrap wrap-break-word text-lg leading-loose opacity-85 sm:text-xl sm:leading-[2.05]">
                  {activeLetter.message}
                </p>
                <div className="pt-6">
                  <p className="text-2xl sm:text-3xl">
                    {activeLetter.closing || "With all my love"},
                  </p>
                  <p className="mt-2 text-lg opacity-60">
                    {activeLetter.sender.length === 0
                      ? "A nameless soul"
                      : activeLetter.sender}
                  </p>
                </div>
              </div>
              <div className="mt-14 flex justify-end pr-2 text-7xl text-primary/15 sm:pr-5">
                <span aria-hidden="true" className="-rotate-12">
                  {activeStyle.ornament}
                </span>
              </div>
            </div>
          </motion.article>
        </section>

        <Footer />
      </motion.div>
    </main>
  );
};

export default page;
