"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import {
  CalendarHeart,
  Clock3,
  Hand,
  Heart,
  LockKeyhole,
  Search,
  Sparkles,
  UnlockKeyhole,
} from "lucide-react";
import { CapsuleData, TimeLeft } from "@/hooks/types";
import { getCapsule } from "@/hooks/actions";
import { toast } from "sonner";

const emptyTimeLeft: TimeLeft = {
  total: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const getUnlockTimestamp = (unlockDate: string, unlockTime: string) =>
  new Date(`${unlockDate}T${unlockTime || "00:00"}:00`).getTime();

const getTimeLeft = (unlockDate: string, unlockTime: string): TimeLeft => {
  const total = Math.max(
    0,
    getUnlockTimestamp(unlockDate, unlockTime) - Date.now(),
  );
  const seconds = Math.floor(total / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return {
    total,
    days,
    hours,
    minutes,
    seconds: seconds % 60,
  };
};

const pad = (value: number) => String(value).padStart(2, "0");

const page = () => {
  const { id } = useParams<{ id: string }>();
  const [capsule, setCapsule] = useState<CapsuleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(emptyTimeLeft);

  const isUnlocked = Boolean(capsule && timeLeft.total <= 0);
  const { scrollYProgress } = useScroll();
  const letterY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const ornamentY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const loadCapsule = async () => {
      setIsLoading(true);
      try {
        const data = await getCapsule(id);
        if (data.success) {
          setCapsule(data.capsule);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCapsule();
  }, [id]);

  useEffect(() => {
    if (!capsule) return;

    const updateTimer = () =>
      setTimeLeft(getTimeLeft(capsule.unlockDate, capsule.unlockTime));
    updateTimer();
    const timer = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(timer);
  }, [capsule]);

  const unlockDate = useMemo(() => {
    if (!capsule) return "";

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(
      new Date(getUnlockTimestamp(capsule.unlockDate, capsule.unlockTime)),
    );
  }, [capsule]);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center overflow-hidden bg-background px-5 text-foreground">
        <div className="relative flex w-full max-w-sm flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="absolute -left-20 top-0 size-56 rounded-full bg-secondary/70 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 bottom-0 size-56 rounded-full bg-accent/35 blur-3xl"
          />

          <div className="relative flex h-56 w-full items-center justify-center">
            <motion.div
              animate={{
                x: [-28, 28, -28],
                y: [8, -8, 8],
                rotate: [-8, 8, -8],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-2 top-20 text-primary"
            >
              <Hand
                className="size-20 -rotate-12 fill-secondary"
                strokeWidth={1.4}
              />
            </motion.div>
            <motion.div
              initial={{ y: 22, scale: 0.86, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex h-24 w-36 items-center justify-center rounded-[1.75rem] border-2 border-primary bg-card shadow-xl shadow-primary/15"
            >
              <Heart className="size-10 fill-primary/15 text-primary" />
              <motion.span
                animate={{ scaleX: [0.7, 1, 0.7] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="absolute -top-2 h-1 w-16 rounded-full bg-primary"
              />
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute right-7 top-12 text-primary"
            >
              <Search className="size-8" />
            </motion.div>
          </div>

          <p className="relative flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-3.5" />
            Looking for your capsule
            <Sparkles className="size-3.5" />
          </p>
          <h1 className="font-heading relative mt-4 text-3xl font-semibold tracking-tight">
            One moment, love.
          </h1>
          <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
            We are finding the little message that was made just for you.
          </p>
          <div className="relative mt-7 flex gap-1.5">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: dot * 0.15,
                }}
                className="size-2 rounded-full bg-primary"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!capsule) return null;

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="relative isolate mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <motion.div
          style={{ y: ornamentY }}
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-24 -z-10 text-[11rem] leading-none text-primary/10"
        >
          ♥
        </motion.div>
        <motion.div
          style={{ y: ornamentY }}
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 top-152 -z-10 text-[10rem] leading-none text-primary/10"
        >
          ✦
        </motion.div>

        <header className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur"
          >
            <Heart className="size-3.5 fill-current" />
            A Love Capsule
            <Heart className="size-3.5 fill-current" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-heading mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter sm:text-6xl"
          >
            {isUnlocked
              ? "A message for your heart."
              : "Something is waiting for you."}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base"
          >
            {isUnlocked
              ? "The wait is over. Take a breath, soften your heart, and read every word slowly."
              : `Someone left you a little piece of their heart, but it will open on ${unlockDate}.`}
          </motion.p>
        </header>

        {!isUnlocked ? (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-10 w-full max-w-xl"
          >
            <div className="relative overflow-hidden rounded-[2.25rem] border border-primary/20 bg-card p-5 shadow-2xl shadow-primary/10 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
              <div className="relative flex flex-col items-center text-center">
                <div className="relative flex h-48 w-64 items-center justify-center sm:h-56 sm:w-80">
                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex h-28 w-44 items-center justify-center rounded-[2rem] border-2 border-primary bg-secondary shadow-xl shadow-primary/20 sm:h-32 sm:w-52"
                  >
                    <Heart className="size-12 fill-primary/15 text-primary" />
                    <div className="absolute -top-3 left-1/2 h-1.5 w-24 -translate-x-1/2 rounded-full bg-primary" />
                    <div className="absolute -bottom-3 left-1/2 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground shadow-lg">
                      <LockKeyhole className="size-5" />
                    </div>
                  </motion.div>
                  <motion.span
                    animate={{ rotate: [0, 8, 0], y: [0, 8, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-1 top-4 text-5xl text-primary/35"
                  >
                    ✦
                  </motion.span>
                </div>

                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  <CalendarHeart className="size-4" />
                  Sealed for {capsule.recipient}
                </p>
                <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight">
                  Still sealed for now
                </h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  This capsule is still sleeping. It will open when the moment
                  chosen by {capsule.sender} arrives.
                </p>

                <div className="mt-7 grid w-full grid-cols-4 gap-2 sm:gap-3">
                  {[
                    [timeLeft.days, "days"],
                    [timeLeft.hours, "hours"],
                    [timeLeft.minutes, "minutes"],
                    [timeLeft.seconds, "seconds"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-primary/15 bg-secondary/35 px-2 py-3 sm:px-3 sm:py-4"
                    >
                      <p className="font-heading text-2xl font-semibold tabular-nums text-primary sm:text-3xl">
                        {label === "days" ? value : pad(Number(value))}
                      </p>
                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-xs text-muted-foreground">
                  <Clock3 className="size-3.5 text-primary" />
                  Opens {unlockDate}
                </div>
              </div>
            </div>
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs leading-5 text-muted-foreground">
              <LockKeyhole className="size-3.5 text-primary" />
              The contents are protected until the timer reaches zero.
            </p>
          </motion.section>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-10 w-full max-w-3xl"
          >
            <motion.div
              style={{ y: letterY }}
              className="relative overflow-hidden rounded-[2.25rem] border border-primary/20 bg-card p-5 shadow-2xl shadow-primary/10 sm:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" />
              <div
                aria-hidden="true"
                className="absolute -right-12 top-10 text-[10rem] leading-none text-primary/10"
              >
                ♥
              </div>
              <div
                aria-hidden="true"
                className="absolute -bottom-14 -left-8 text-[9rem] leading-none text-primary/10"
              >
                ✦
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-4 border-b border-primary/15 pb-6">
                  <div>
                    <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                      <Sparkles className="size-3.5" />
                      Finally opened
                    </p>
                    <h2 className="font-heading mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                      For {capsule.recipient}
                    </h2>
                  </div>
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <UnlockKeyhole className="size-5" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7, type: "spring" }}
                  className="relative my-7 overflow-hidden rounded-[1.75rem] border border-primary/20 bg-secondary/35 px-5 py-6 text-center sm:my-8 sm:px-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    {["♥", "✦", "♡", "✧", "♥"].map((symbol, index) => (
                      <motion.span
                        key={`${symbol}-${index}`}
                        animate={{
                          y: [12, -16, 12],
                          x: [0, index % 2 === 0 ? 8 : -8, 0],
                          opacity: [0.25, 0.75, 0.25],
                          rotate: [0, index % 2 === 0 ? 12 : -12, 0],
                        }}
                        transition={{
                          duration: 3 + index * 0.35,
                          repeat: Infinity,
                          delay: index * 0.18,
                          ease: "easeInOut",
                        }}
                        className={`absolute text-primary/50 ${
                          [
                            "left-7 top-5",
                            "left-1/4 top-3",
                            "right-1/4 bottom-3",
                            "right-8 top-7",
                            "left-1/2 bottom-2",
                          ][index]
                        } ${index % 2 === 0 ? "text-2xl" : "text-lg"}`}
                      >
                        {symbol}
                      </motion.span>
                    ))}
                  </div>
                  <div className="relative">
                    <motion.div
                      animate={{ scale: [1, 1.12, 1], rotate: [-4, 4, -4] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    >
                      <Heart className="size-5 fill-current" />
                    </motion.div>
                    <p className="font-heading mt-4 text-2xl font-semibold text-primary">
                      You made it here.
                    </p>
                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                      Every passing second was carrying these words closer to
                      you. Let them find a soft place in your heart.
                    </p>
                  </div>
                </motion.div>

                <article className="py-8 sm:py-10">
                  <p className="font-heading text-xl italic text-primary">
                    Dear {capsule.recipient},
                  </p>
                  <p className="mt-7 whitespace-pre-wrap wrap-break-word text-base leading-8 text-foreground/85 sm:text-lg sm:leading-9">
                    {capsule.message}
                  </p>
                  <div className="mt-10 border-t border-primary/15 pt-6">
                    <p className="font-heading text-xl italic text-primary">
                      With all my love,
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {capsule.sender}
                    </p>
                  </div>
                </article>

                <div className="grid gap-3 border-t border-primary/15 pt-6 sm:grid-cols-3">
                  {[
                    ["A tiny reminder", "You are deeply, endlessly loved."],
                    [
                      "Keep this close",
                      "Come back whenever your heart needs it.",
                    ],
                    [
                      "One more thing",
                      "You make ordinary moments feel special.",
                    ],
                  ].map(([title, copy], index) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.75 + index * 0.12 }}
                      className="rounded-2xl border border-primary/15 bg-secondary/30 p-4 text-center"
                    >
                      <Heart className="mx-auto size-4 fill-primary/20 text-primary" />
                      <p className="mt-2 text-xs font-semibold text-foreground">
                        {title}
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                        {copy}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-primary/15 pt-5 text-xs text-muted-foreground sm:flex-row">
                  <span className="flex items-center gap-2">
                    <CalendarHeart className="size-3.5 text-primary" />
                    Opened on your special day
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart className="size-3.5 fill-primary text-primary" />
                    Made with love
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.section>
        )}
      </div>
    </main>
  );
};

export default page;
