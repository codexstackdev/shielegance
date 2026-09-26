"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  Clipboard,
  ExternalLink,
  Heart,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

interface UnlockBtnProps {
  unlockUrl: string;
}

const STORAGE_KEY = "shielegance_unlock_state";
const WAIT_SECONDS = 5;
const INSTAGRAM_URL = "https://www.instagram.com/codexstackdev";

type StoredState = {
  status: "waiting" | "unlocked";
  unlockAt: number;
};

type UnlockStatus = "idle" | "waiting" | "unlocked";

const getStoredState = (): StoredState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredState;
  } catch {
    return null;
  }
};

const setStoredState = (state: StoredState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    return;
  }
};

const UnlockBtn = ({ unlockUrl }: UnlockBtnProps) => {
  const [status, setStatus] = useState<UnlockStatus>("idle");
  const [secondsLeft, setSecondsLeft] = useState(WAIT_SECONDS);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = getStoredState();
    if (!saved) return;

    if (saved.status === "unlocked") {
      setStatus("unlocked");
      return;
    }

    const remainingMs = saved.unlockAt - Date.now();

    if (remainingMs <= 0) {
      setStatus("unlocked");
      setStoredState({ status: "unlocked", unlockAt: saved.unlockAt });
      return;
    }

    setSecondsLeft(Math.ceil(remainingMs / 1000));
    setStatus("waiting");
  }, []);

  useEffect(() => {
    if (status !== "waiting") return;

    timerRef.current = setInterval(() => {
      const saved = getStoredState();
      const unlockAt = saved?.unlockAt ?? Date.now();
      const remainingMs = unlockAt - Date.now();

      if (remainingMs <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setStatus("unlocked");
        setStoredState({ status: "unlocked", unlockAt });
        return;
      }

      setSecondsLeft(Math.ceil(remainingMs / 1000));
    }, 250);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const handleFollowClick = () => {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    const unlockAt = Date.now() + WAIT_SECONDS * 1000;
    setStoredState({ status: "waiting", unlockAt });
    setSecondsLeft(WAIT_SECONDS);
    setStatus("waiting");
  };

  const handleCopyLink = async () => {
    try {
      const finalUrl = process.env.NODE_ENV === "development" ? `localhost:3000/kenshie/loveLetter/${unlockUrl}` : `https://shielegance.vercel.app/kenshie/loveLetter/${unlockUrl}`
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleOpenPreview = () => {
    const finalUrl = process.env.NODE_ENV === "development" ? `localhost:3000/kenshie/loveLetter/${unlockUrl}` : `https://shielegance.vercel.app/kenshie/loveLetter/${unlockUrl}`
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  const progress = status === "idle" ? 0 : status === "waiting" ? 66 : 100;

  return (
    <section className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-border bg-card text-card-foreground shadow-xl shadow-primary/10">
      <div className="relative overflow-hidden bg-secondary/45 px-5 pb-7 pt-6 sm:px-7">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-16 size-40 rounded-full bg-accent/45 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-16 size-40 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
            {status === "unlocked" ? (
              <Check className="size-5" />
            ) : (
              <LockKeyhole className="size-5" />
            )}
          </div>

          <span className="rounded-full border border-border/70 bg-card/75 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary backdrop-blur">
            {status === "idle"
              ? "Private preview"
              : status === "waiting"
                ? "Almost there"
                : "Preview ready"}
          </span>
        </div>

        <div className="relative mt-6">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Heart className="size-3.5 fill-current" />
            Shielegance
          </p>
          <h2 className="font-heading mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">
            {status === "unlocked"
              ? "Your preview is ready"
              : "A little surprise awaits"}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            {status === "idle"
              ? "Follow along for a moment and unlock the private preview link for this beautiful letter."
              : status === "waiting"
                ? "Keep this window open while we prepare your private preview link."
                : "Your private preview link is ready to share or open in a new tab."}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-7 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <span
              className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${status !== "idle" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {status !== "idle" ? <Check className="size-3.5" /> : "1"}
            </span>
            <span className="h-px flex-1 bg-border" />
            <span
              className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${status === "unlocked" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {status === "unlocked" ? <Check className="size-3.5" /> : "2"}
            </span>
            <span className="h-px flex-1 bg-border" />
            <span
              className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${status === "unlocked" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {status === "unlocked" ? <Check className="size-3.5" /> : "3"}
            </span>
          </div>
        </div>

        <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>

        {status === "idle" && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleFollowClick}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <LockKeyhole className="size-4" />
              Follow to unlock preview
              <ExternalLink className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <p className="text-center text-xs leading-5 text-muted-foreground">
              You will be redirected to Instagram in a new tab.
            </p>
          </div>
        )}

        {status === "waiting" && (
          <div className="rounded-2xl border border-border bg-muted/45 p-4 text-center">
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
              <Sparkles className="size-4 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Unlocking your preview
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your link will be ready in {secondsLeft} second
              {secondsLeft === 1 ? "" : "s"}.
            </p>
            <div className="mx-auto mt-4 flex max-w-52 items-center justify-center gap-1.5">
              {Array.from({ length: WAIT_SECONDS }).map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${index < WAIT_SECONDS - secondsLeft ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        )}

        {status === "unlocked" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="rounded-2xl border border-primary/25 bg-secondary/35 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                Private preview link
              </p>
              <p className="break-all text-sm leading-6 text-foreground">
                {process.env.NODE_ENV === "development" ? `localhost:3000/kenshie/loveLetter/${unlockUrl}` : `https://shielegance.vercel.app/kenshie/loveLetter/${unlockUrl}`}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {copied ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <Clipboard className="size-4" />
                )}
                {copied ? "Copied" : "Copy link"}
              </button>
              <button
                type="button"
                onClick={handleOpenPreview}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Open preview
                <ExternalLink className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UnlockBtn;
