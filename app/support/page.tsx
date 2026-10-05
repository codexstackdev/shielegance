"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  Clock3,
  Heart,
  HelpCircle,
  MessageCircleHeart,
  Sparkles,
} from "lucide-react";

const page = () => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(
      "https://tawk.to/chat/69bd67f7543dde1c2c62d89a/default?layout=modern",
    );
  }, []);
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-8 -z-10 size-80 rounded-full bg-secondary/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-72 -z-10 size-96 rounded-full bg-accent/30 blur-3xl"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur">
              <Heart className="size-3.5 fill-current" />
              Shielegance support
              <Heart className="size-3.5 fill-current" />
            </div>
            <h1 className="font-heading mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter sm:text-6xl">
              We are here to help
              <span className="block text-primary">
                with all the little things.
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Need help creating, unlocking, or sharing something special? Send
              us a message and we will take care of you.
            </p>
          </motion.header>

          <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-8">
            <motion.aside
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 text-8xl leading-none text-primary/10"
                >
                  ♥
                </div>
                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                    <MessageCircleHeart className="size-5" />
                  </div>
                  <h2 className="font-heading mt-5 text-2xl font-semibold tracking-tight">
                    Talk to our team
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Start a conversation in the chat window. Tell us what went
                    wrong and include your preview link if you have one.
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/35 p-3.5">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">
                          Friendly assistance
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          We will help you find a simple solution.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/35 p-3.5">
                      <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">
                          Response times vary
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Leave a message if we are away and we will get back to
                          you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-primary/20 bg-secondary/35 p-5">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.17em] text-primary">
                  <Sparkles className="size-3.5" />
                  Before you chat
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-primary">♡</span>
                    Keep your message link nearby.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">♡</span>
                    Mention which feature you are using.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">♡</span>
                    Screenshots can help us understand faster.
                  </li>
                </ul>
              </div>
            </motion.aside>

            <motion.section
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
              className="min-w-0"
            >
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
                <div className="flex items-center justify-between gap-4 border-b border-border bg-secondary/35 px-5 py-4 sm:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <HelpCircle className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold sm:text-base">
                        Shielegance help desk
                      </h2>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span
                          className={`size-1.5 rounded-full ${isChatLoaded ? "bg-primary" : "animate-pulse bg-muted-foreground"}`}
                        />
                        {isChatLoaded
                          ? "Chat is ready"
                          : "Connecting you to support"}
                      </p>
                    </div>
                  </div>
                  <Heart className="size-5 shrink-0 fill-primary/15 text-primary" />
                </div>

                <div className="relative h-[min(70vh,720px)] min-h-130 w-full bg-background sm:h-[min(72vh,760px)]">
                  {!isChatLoaded && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/90 text-center backdrop-blur-sm">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [-4, 4, -4] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary"
                      >
                        <Heart className="size-5 fill-current" />
                      </motion.div>
                      <p className="text-sm font-semibold">
                        Opening a little help window...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        One moment, please.
                      </p>
                    </div>
                  )}
                  <iframe
                    src={url}
                    title="Shielegance customer support chat"
                    onLoad={() => setIsChatLoaded(true)}
                    className="block h-full min-h-0 w-full border-0"
                    loading="eager"
                    allow="clipboard-write"
                  />
                </div>
              </div>
            </motion.section>
          </div>

          <p className="mx-auto mt-8 flex max-w-xl items-center justify-center gap-2 text-center text-xs leading-5 text-muted-foreground">
            <Heart className="size-3.5 shrink-0 fill-primary text-primary" />
            Thank you for helping us make Shielegance more magical for everyone.
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
