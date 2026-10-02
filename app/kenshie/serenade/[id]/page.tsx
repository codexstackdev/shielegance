"use client";

import { useEffect, useState } from "react";
import {
  Heart,
  Music2,
  Play,
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "motion/react";

const serenade = {
  recipient: "Kenshie",
  sender: "Someone special",
  title: "A song I wanted you to hear",
  message:
    "I hope this song finds you at the exact right moment. Some feelings are too soft to say all at once, so I found a melody to carry them for me. Whenever this plays, I hope you remember that somewhere in this world, someone is thinking about you with the warmest heart.",
  videoId: "1UzYcqkiCwQ",
};

const page = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 350);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 size-96 rounded-full bg-secondary/70 blur-3xl" />
        <div className="absolute -bottom-48 -right-40 size-[28rem] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/4 size-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto flex min-h-svh w-full max-w-5xl flex-col px-5 sm:px-8"
      >
        <header className="flex items-center justify-center py-7 sm:py-10">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <Heart className="size-4 fill-current" />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              shielegance
            </span>
          </div>
        </header>

        <section className="relative flex flex-1 flex-col items-center pb-16 pt-8 text-center sm:pt-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-7 flex size-16 items-center justify-center rounded-full bg-secondary text-primary shadow-sm"
          >
            <Music2 className="size-7" />
            <motion.span
              animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-primary/30"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary"
          >
            <Sparkles className="size-3.5" />
            A serenade for you
            <Sparkles className="size-3.5" />
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.75 }}
            className="font-heading mx-auto mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl"
          >
            Press play,
            <span className="block text-primary">feel everything.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mx-auto mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg"
          >
            {serenade.sender} left you a song because sometimes a melody can
            say what the heart is still learning how to explain.
          </motion.p>

          <div className="relative mt-12 w-full max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 28, rotate: -1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-3 shadow-2xl shadow-primary/10 sm:rounded-[2rem] sm:p-5"
            >
              <div className="relative aspect-video overflow-hidden rounded-[1rem] bg-foreground shadow-inner sm:rounded-[1.25rem]">
                <iframe
                  src={`https://www.youtube.com/embed/${serenade.videoId}?rel=0`}
                  title={serenade.title}
                  className="absolute inset-0 size-full border-0"
                  allowFullScreen
                  scrolling="no"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 transition-opacity hover:opacity-100">
                  <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
                    <Play className="ml-0.5 size-6 fill-current" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 px-2 pb-1 pt-5 text-left sm:flex-row sm:items-center sm:justify-between sm:px-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Now playing for {serenade.recipient}
                  </p>
                  <p className="mt-1 truncate text-base font-semibold text-card-foreground sm:text-lg">
                    {serenade.title}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-primary">
                  <Heart className="size-4 fill-current" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Made with feeling
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 -top-8 z-10 text-primary/50 sm:-left-10 sm:-top-10"
            >
              <Star className="size-9 fill-current sm:size-12" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute -right-3 bottom-16 z-10 text-primary/45 sm:-right-8"
            >
              <Heart className="size-10 fill-current sm:size-14" />
            </motion.div>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="relative mt-7 w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-primary/20 bg-secondary/45 p-6 text-left shadow-sm sm:rounded-[2rem] sm:p-10"
          >
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-12 text-8xl text-primary/10"
            >
              “
            </div>
            <div className="relative">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-primary/15 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    A message for {serenade.recipient}
                  </p>
                  <p className="mt-2 font-heading text-xl text-foreground">
                    {serenade.title}
                  </p>
                </div>
                <Heart className="size-5 shrink-0 fill-primary/20 text-primary" />
              </div>

              <p className="max-w-prose whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-base leading-8 text-foreground/80 sm:text-lg sm:leading-9">
                {serenade.message}
              </p>

              <div className="mt-8 flex items-end justify-between gap-4">
                <div>
                  <p className="font-heading text-xl text-foreground">
                    With all my love,
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {serenade.sender}
                  </p>
                </div>
                <span className="text-3xl text-primary/25">♡</span>
              </div>
            </div>
          </motion.article>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-8 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Heart className="size-3 fill-primary text-primary" />
            Some songs stay with us because of who sent them.
            <Heart className="size-3 fill-primary text-primary" />
          </motion.p>
        </section>

        <footer className="border-t border-border/70 py-6 text-center text-xs leading-5 text-muted-foreground">
          Made for the feelings that deserve a soundtrack.
        </footer>
      </motion.div>
    </main>
  );
};

export default page;
