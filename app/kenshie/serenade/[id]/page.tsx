"use client";

import { useEffect, useState } from "react";
import { Heart, LockKeyhole, Music2, Play, Sparkles, Star } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Footer from "@/app/components/Footer";
import { getSerenade } from "@/hooks/actions";
import { useParams } from "next/navigation";
import { serenadeProps } from "@/hooks/types";
import { toast } from "sonner";

const page = () => {
  const param = useParams<{id: string}>();
  const [serenade, setSerenade] = useState<serenadeProps | null>(null)
  const [isEntered, setIsEntered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isTryingToOpen, setIsTryingToOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const motionDuration = reduceMotion ? 0 : 0.75;

  useEffect(() => {
    const getData = async() => {
      const data = await getSerenade(param.id);
      if(data.success){
        setSerenade(data.serenade)
      }
      else{
        toast.error(data.message)
      }
    }
    getData();
  }, [param.id]);

  const openWindow = () => {
    if (isOpening) return;
    if (!serenade) {
      setIsTryingToOpen(true);
      window.setTimeout(() => setIsTryingToOpen(false), 900);
      return;
    }
    setIsOpening(true);
  };

  return (
    <>
      {!isEntered ? (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpening ? 0 : 1 }}
          transition={{ duration: motionDuration, delay: isOpening ? 0.25 : 0 }}
          onAnimationComplete={() => {
            if (isOpening) setIsEntered(true);
          }}
          className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-5 text-foreground"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-36 -top-32 size-80 rounded-full bg-secondary/70 blur-3xl" />
            <div className="absolute -bottom-40 -right-28 size-96 rounded-full bg-accent/30 blur-3xl" />
          </div>

          <div className="relative flex w-full max-w-md flex-col items-center text-center">
            <p className="font-heading text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
              Someone’s outside
              <span className="mt-1 block text-primary">
                with a song for you.
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground sm:text-base">
              A little serenade is waiting just beyond the window.
            </p>

            <motion.button
              type="button"
              aria-label={serenade ? "Open the window and reveal your serenade" : "The window is locked while the serenade loads"}
              disabled={isOpening}
              onClick={openWindow}
              whileHover={reduceMotion ? undefined : { scale: 1.025 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="group relative mt-8 block w-64 rounded-[2rem] p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:cursor-default sm:mt-10 sm:w-72"
            >
              <span className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-primary/5 blur-xl transition-colors group-hover:bg-primary/10" />
              <span className="relative block aspect-4/5 overflow-hidden rounded-[1.6rem] border-[5px] border-primary/25 bg-linear-to-b from-secondary via-background to-accent/30 p-2 shadow-2xl shadow-primary/10">
                <span className="absolute inset-2 rounded-[1.15rem] border border-primary/20" />
                <span className="absolute left-1/2 top-2 bottom-2 z-20 w-1 -translate-x-1/2 bg-primary/25" />
                <span className="absolute left-2 right-2 top-1/2 z-20 h-1 -translate-y-1/2 bg-primary/25" />

                {!serenade && (
                  <motion.span
                    aria-label="The serenade is still loading"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={isTryingToOpen ? { x: [0, -8, 8, -6, 6, 0], rotate: [0, -8, 8, -6, 6, 0], scale: [1, 1.08, 1] } : { x: 0, rotate: 0, scale: 1 }}
                    transition={{ duration: isTryingToOpen ? 0.65 : 0.35, ease: "easeInOut" }}
                    className="absolute left-1/2 top-1/2 z-40 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-primary/25 bg-card/90 text-primary shadow-xl backdrop-blur sm:size-20"
                  >
                    <LockKeyhole className="size-7 sm:size-8" />
                  </motion.span>
                )}

                <span
                  aria-hidden="true"
                  className="absolute inset-2 flex overflow-hidden rounded-[1.1rem]"
                >
                  <motion.span
                    animate={{ x: isOpening ? "-105%" : "0%" }}
                    transition={{
                      duration: motionDuration,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex h-full w-1/2 items-center justify-center border-r border-primary/20 bg-linear-to-br from-secondary/95 to-primary/10 shadow-inner"
                  >
                    <span className="absolute inset-x-3 top-1/2 h-px bg-primary/15" />
                    <span className="absolute inset-y-3 left-1/2 w-px bg-primary/15" />
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary/70 shadow-sm">
                      <span className="size-1.5 rounded-full bg-primary/60" />
                    </span>
                  </motion.span>
                  <motion.span
                    animate={{ x: isOpening ? "105%" : "0%" }}
                    transition={{
                      duration: motionDuration,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex h-full w-1/2 items-center justify-center border-l border-primary/20 bg-linear-to-bl from-secondary/95 to-primary/10 shadow-inner"
                  >
                    <span className="absolute inset-x-3 top-1/2 h-px bg-primary/15" />
                    <span className="absolute inset-y-3 left-1/2 w-px bg-primary/15" />
                    <span className="relative z-10 flex size-8 items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary/70 shadow-sm">
                      <Heart className="size-3.5 fill-primary/25" />
                    </span>
                  </motion.span>
                </span>
              </span>
            </motion.button>

            <p className="mt-5 flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
              <Sparkles className="size-3.5 text-primary" />
              {serenade ? "Tap the window to let the serenade in" : "The window is still locked"}
              <Sparkles className="size-3.5 text-primary" />
            </p>
          </div>
        </motion.main>
      ) : (
        <motion.main
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
          className="relative min-h-svh overflow-hidden bg-background text-foreground"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 overflow-hidden"
          >
            <div className="absolute -left-40 -top-40 size-96 rounded-full bg-secondary/70 blur-3xl" />
            <div className="absolute -bottom-48 -right-40 size-112 rounded-full bg-accent/30 blur-3xl" />
            <div className="absolute left-1/2 top-1/4 size-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative mx-auto flex min-h-svh w-full max-w-5xl flex-col px-5 sm:px-8">
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
                initial={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 0.7,
                  y: reduceMotion ? 0 : 15,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.8,
                  ease: "easeOut",
                }}
                className="relative mb-7 flex size-16 items-center justify-center rounded-full bg-secondary text-primary shadow-sm"
              >
                <Music2 className="size-7" />
                {!reduceMotion && (
                  <motion.span
                    animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full border border-primary/30"
                  />
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.15,
                  duration: reduceMotion ? 0 : 0.6,
                }}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary"
              >
                <Sparkles className="size-3.5" />
                A serenade for you
                <Sparkles className="size-3.5" />
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.25,
                  duration: reduceMotion ? 0 : 0.75,
                }}
                className="font-heading mx-auto mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-7xl"
              >
                Press play,
                <span className="block text-primary">feel everything.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.4,
                  duration: reduceMotion ? 0 : 0.7,
                }}
                className="mx-auto mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg"
              >
                {serenade?.sender} left you a song because sometimes a melody can
                say what the heart is still learning how to explain.
              </motion.p>

              <div className="relative mt-12 w-full max-w-3xl">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 28,
                    rotate: reduceMotion ? 0 : -1.5,
                  }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.55,
                    duration: reduceMotion ? 0 : 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-3 shadow-2xl shadow-primary/10 sm:rounded-[2rem] sm:p-5"
                >
                  <div className="relative aspect-video overflow-hidden rounded-[1rem] bg-foreground shadow-inner sm:rounded-[1.25rem]">
                    {isEntered && serenade && (
                      <iframe
                      src={`https://www.youtube.com/embed/${serenade.songId}?rel=0&autoplay=1&controls=0&cc_load_policy=0`}
                      title={serenade?.title}
                      className="absolute inset-0 size-full border-0"
                      scrolling="no"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin"
                    />
                    )}
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 transition-opacity hover:opacity-100">
                      <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
                        <Play className="ml-0.5 size-6 fill-current" />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 px-2 pb-1 pt-5 text-left sm:flex-row sm:items-center sm:justify-between sm:px-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                        Now playing for {serenade?.recipient}
                      </p>
                      <p className="mt-1 truncate text-base font-semibold text-card-foreground sm:text-lg">
                        {serenade?.title}
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

                {!reduceMotion && (
                  <>
                    <motion.div
                      animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -left-4 -top-8 z-10 text-primary/50 sm:-left-10 sm:-top-10"
                    >
                      <Star className="size-9 fill-current sm:size-12" />
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 10, 0], rotate: [8, -8, 8] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.4,
                      }}
                      className="absolute -right-3 bottom-16 z-10 text-primary/45 sm:-right-8"
                    >
                      <Heart className="size-10 fill-current sm:size-14" />
                    </motion.div>
                  </>
                )}
              </div>

              <motion.article
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.75,
                  duration: reduceMotion ? 0 : 0.8,
                }}
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
                        A message for {serenade?.recipient}
                      </p>
                      <p className="mt-2 font-heading text-xl text-foreground">
                        {serenade?.title}
                      </p>
                    </div>
                    <Heart className="size-5 shrink-0 fill-primary/20 text-primary" />
                  </div>

                  <p className="max-w-prose whitespace-pre-wrap wrap-break-word text-base leading-8 text-foreground/80 sm:text-lg sm:leading-9">
                    {serenade?.message}
                  </p>

                  <div className="mt-8 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-heading text-xl text-foreground">
                        With all my love,
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {serenade?.sender}
                      </p>
                    </div>
                    <span className="text-3xl text-primary/25">♡</span>
                  </div>
                </div>
              </motion.article>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: reduceMotion ? 0 : 1.1,
                  duration: reduceMotion ? 0 : 0.7,
                }}
                className="mt-8 flex items-center gap-2 text-xs text-muted-foreground"
              >
                <Heart className="size-3 fill-primary text-primary" />
                Some songs stay with us because of who sent them.
                <Heart className="size-3 fill-primary text-primary" />
              </motion.p>
            </section>

            <Footer />
          </div>
        </motion.main>
      )}
    </>
  );
};

export default page;
