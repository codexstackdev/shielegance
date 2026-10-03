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
import QRgenerator from "./QRgenerator";
import cheer from "@/assets/cheer.svg";

interface UnlockBtnProps {
  unlockUrl: string;
  path: string;
}

const STORAGE_PREFIX = "shielegance_unlock_state";
const WAIT_SECONDS = 5;
const UNLOCK_EXPIRY_MS = 5 * 60 * 1000;
const INSTAGRAM_URL = "https://www.instagram.com/codexstackdev";

type StoredState = {
  status: "waiting" | "unlocked";
  unlockAt: number;
  expiresAt: number;
};

type UnlockStatus = "idle" | "waiting" | "unlocked";

const getStorageKey = (unlockUrl: string) => `${STORAGE_PREFIX}_${unlockUrl}`;

const getStoredState = (unlockUrl: string): StoredState | null => {
  try {
    const raw = localStorage.getItem(getStorageKey(unlockUrl));
    if (!raw) return null;
    return JSON.parse(raw) as StoredState;
  } catch {
    return null;
  }
};

const setStoredState = (unlockUrl: string, state: StoredState) => {
  try {
    localStorage.setItem(getStorageKey(unlockUrl), JSON.stringify(state));
  } catch {
    return;
  }
};

const deriveState = (unlockUrl: string): { status: UnlockStatus; secondsLeft: number } => {
  const saved = getStoredState(unlockUrl);

  if (!saved) {
    return { status: "idle", secondsLeft: WAIT_SECONDS };
  }

  if (saved.status === "unlocked") {
    if (Date.now() >= saved.expiresAt) {
      return { status: "idle", secondsLeft: WAIT_SECONDS };
    }
    return { status: "unlocked", secondsLeft: 0 };
  }

  const remainingMs = saved.unlockAt - Date.now();

  if (remainingMs <= 0) {
    const expiresAt = Date.now() + UNLOCK_EXPIRY_MS;
    setStoredState(unlockUrl, { status: "unlocked", unlockAt: saved.unlockAt, expiresAt });
    return { status: "unlocked", secondsLeft: 0 };
  }

  return { status: "waiting", secondsLeft: Math.ceil(remainingMs / 1000) };
};

const UnlockBtn = ({ unlockUrl, path }: UnlockBtnProps) => {
  const [status, setStatus] = useState<UnlockStatus>(
    () => deriveState(unlockUrl).status
  );
  const [secondsLeft, setSecondsLeft] = useState(
    () => deriveState(unlockUrl).secondsLeft
  );
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const { status: nextStatus, secondsLeft: nextSeconds } = deriveState(unlockUrl);
    setStatus(nextStatus);
    setSecondsLeft(nextSeconds);
  }, [unlockUrl]);

  useEffect(() => {
    if (status !== "waiting") return;

    timerRef.current = setInterval(() => {
      const saved = getStoredState(unlockUrl);
      const unlockAt = saved?.unlockAt ?? Date.now();
      const remainingMs = unlockAt - Date.now();

      if (remainingMs <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        const expiresAt = Date.now() + UNLOCK_EXPIRY_MS;
        setStatus("unlocked");
        setStoredState(unlockUrl, { status: "unlocked", unlockAt, expiresAt });
        return;
      }

      setSecondsLeft(Math.ceil(remainingMs / 1000));
    }, 250);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, unlockUrl]);

  useEffect(() => {
    if (status !== "unlocked") return;

    const saved = getStoredState(unlockUrl);
    if (!saved || saved.status !== "unlocked") return;

    const msUntilExpiry = saved.expiresAt - Date.now();
    if (msUntilExpiry <= 0) {
      setStatus("idle");
      setSecondsLeft(WAIT_SECONDS);
      return;
    }

    const expiryTimer = setTimeout(() => {
      setStatus("idle");
      setSecondsLeft(WAIT_SECONDS);
    }, msUntilExpiry);

    return () => clearTimeout(expiryTimer);
  }, [status, unlockUrl]);

  const handleFollowClick = () => {
    window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer");
    const unlockAt = Date.now() + WAIT_SECONDS * 1000;
    setStoredState(unlockUrl, { status: "waiting", unlockAt, expiresAt: 0 });
    setSecondsLeft(WAIT_SECONDS);
    setStatus("waiting");
  };

  const handleCopyLink = async () => {
    try {
      const finalUrl = process.env.NODE_ENV === "development" ? `localhost:3000/kenshie/${path}/${unlockUrl}` : `https://shielegance.vercel.app/kenshie/${path}/${unlockUrl}`
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleOpenPreview = () => {
    const finalUrl = process.env.NODE_ENV === "development" ? `http://localhost:3000/kenshie/${path}/${unlockUrl}` : `https://shielegance.vercel.app/kenshie/${path}/${unlockUrl}`
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
            className="space-y-4"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/20 bg-secondary/35 p-5 text-center sm:p-6">
              <div aria-hidden="true" className="absolute -right-12 -top-16 size-40 rounded-full bg-accent/40 blur-3xl" />
              <div aria-hidden="true" className="absolute -bottom-20 -left-14 size-44 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative flex flex-col items-center">
                <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md shadow-primary/20">
                  <Heart className="size-4 fill-current" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  A little love to share
                </p>
                <h3 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  Your preview is ready
                </h3>
                <p className="mt-2 max-w-xs text-xs leading-5 text-muted-foreground">
                  Scan this heart-made code or send the link to someone special.
                </p>
                <div className="mt-5 flex w-full min-w-0 justify-center overflow-hidden">
                  <QRgenerator
                    url={process.env.NODE_ENV === "development" ? `http://localhost:3000/kenshie/${path}/${unlockUrl}` : `https://shielegance.vercel.app/kenshie/${path}/${unlockUrl}`}
                    size={240}
                    fileName="shielegance"
                    image={cheer.src}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/35 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="size-3.5 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                  Private preview link
                </p>
              </div>
              <p className="break-all rounded-xl border border-border bg-background px-3 py-2.5 text-sm leading-6 text-foreground">
                {process.env.NODE_ENV === "development" ? `localhost:3000/kenshie/${path}/${unlockUrl}` : `https://shielegance.vercel.app/kenshie/${path}/${unlockUrl}`}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {copied ? <Check className="size-4 text-primary" /> : <Clipboard className="size-4" />}
                {copied ? "Copied" : "Copy link"}
              </button>
              <button
                type="button"
                onClick={handleOpenPreview}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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