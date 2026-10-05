"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CalendarClock,
  Check,
  ChevronRight,
  Clock3,
  Heart,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";
import Footer from "@/app/components/Footer";
import { createCapsule } from "@/hooks/actions";
import { toast } from "sonner";
import UnlockBtn from "@/app/components/UnlockBtn";

const page = () => {
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [unlockDate, setUnlockDate] = useState("");
  const [unlockTime, setUnlockTime] = useState("12:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSealing, setIsSealing] = useState(false);
  const [id, setId] = useState("");

  const formattedUnlockDate = useMemo(() => {
    if (!unlockDate) return "Your chosen moment";

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${unlockDate}T${unlockTime || "12:00"}`));
  }, [unlockDate, unlockTime]);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setIsSealing(true);
    try {
      const data = await createCapsule(
        recipient,
        sender,
        message,
        unlockDate,
        unlockTime,
      );
      if (data.success) {
        toast.success(data.message);
        setIsSubmitting(true);
        setId(data.id);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSealing(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <AnimatePresence>
        {isSealing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background/80 px-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              className="flex w-full max-w-xs flex-col items-center rounded-[2rem] border border-primary/20 bg-card p-7 text-center shadow-2xl shadow-primary/20"
            >
              <div className="relative flex size-28 items-center justify-center">
                <motion.div
                  initial={{ rotate: -8, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 12 }}
                  className="relative flex h-16 w-24 items-center justify-center rounded-[1.25rem] border-2 border-primary bg-secondary shadow-lg shadow-primary/15"
                >
                  <Heart className="size-7 fill-primary text-primary" />
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.45, duration: 0.35 }}
                    className="absolute -top-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-primary"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -18, scale: 0.7 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.85,
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                  }}
                  className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-card bg-primary text-primary-foreground shadow-lg"
                >
                  <LockKeyhole className="size-5" />
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="font-heading mt-2 text-2xl font-semibold text-foreground"
              >
                Locked with love
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.35 }}
                className="mt-2 text-sm leading-6 text-muted-foreground"
              >
                Your words are safely sealed until their special moment.
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 -z-10 size-72 rounded-full bg-secondary/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-80 -z-10 size-80 rounded-full bg-accent/35 blur-3xl"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <header className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur"
            >
              <Heart className="size-3.5 fill-current" />
              Love Capsule
              <Heart className="size-3.5 fill-current" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="font-heading mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter sm:text-6xl"
            >
              Write it now.
              <span className="block text-primary">Open it later.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base"
            >
              Tuck your feelings away in a little digital capsule and let time
              deliver them when the moment feels just right.
            </motion.p>
          </header>

          <div className="mx-auto mt-10 grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-8">
            <motion.form
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
              onSubmit={handleSubmit}
              className="min-w-0 rounded-[2rem] border border-border bg-card p-5 shadow-xl shadow-primary/5 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    <Sparkles className="size-3.5" />
                    Seal your message
                  </p>
                  <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight">
                    Create a capsule
                  </h2>
                </div>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <LockKeyhole className="size-5" />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-foreground">
                      Their name
                    </span>
                    <div className="relative">
                      <Heart className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
                      <input
                        value={recipient}
                        onChange={(event) => setRecipient(event.target.value)}
                        placeholder="Who is this for?"
                        className="h-12 w-full rounded-2xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                    </div>
                  </label>

                  <label className="space-y-2">
                    <span className="text-sm font-semibold text-foreground">
                      Your name
                    </span>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
                      <input
                        value={sender}
                        onChange={(event) => setSender(event.target.value)}
                        placeholder="Signed with love by..."
                        className="h-12 w-full rounded-2xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                    </div>
                  </label>
                </div>

                <label className="block space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground">
                      Your message
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.length}/2000
                    </span>
                  </div>
                  <textarea
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value.slice(0, 2000))
                    }
                    placeholder="Write something they can keep forever..."
                    rows={7}
                    className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>

                <div className="rounded-[1.5rem] border border-primary/20 bg-secondary/35 p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                      <CalendarClock className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        Choose the reveal moment
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        Your capsule stays sealed until the date and time you
                        choose.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[1.25fr_0.75fr]">
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Unlock date
                      </span>
                      <input
                        type="date"
                        value={unlockDate}
                        onChange={(event) => setUnlockDate(event.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="h-12 w-full rounded-2xl border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                        Unlock time
                      </span>
                      <div className="relative">
                        <Clock3 className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
                        <input
                          type="time"
                          value={unlockTime}
                          onChange={(event) =>
                            setUnlockTime(event.target.value)
                          }
                          className="h-12 w-full rounded-2xl border border-border bg-background pl-10 pr-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {isSubmitting ? (
                <div className="mt-6 w-full min-w-0 overflow-hidden">
                  <UnlockBtn path="/loveCapsule" unlockUrl={id} />
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Check className="size-4" />
                  ) : (
                    <LockKeyhole className="size-4" />
                  )}
                  {isSubmitting
                    ? "Capsule ready to seal"
                    : "Seal my love capsule"}
                  {!isSubmitting && <ChevronRight className="size-4" />}
                </button>
              )}
            </motion.form>

            <motion.section
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.26 }}
              className="min-w-0 lg:sticky lg:top-6"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="size-3.5" />
                  Live preview
                </p>
                <span className="text-xs text-muted-foreground">
                  Private until unlocked
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-card p-5 shadow-xl shadow-primary/10 sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 text-8xl text-primary/10"
                >
                  ♥
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -left-10 text-8xl text-primary/10"
                >
                  ✦
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between border-b border-primary/15 pb-5">
                    <div>
                      <p className="font-heading text-2xl font-semibold text-primary">
                        Love Capsule
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        To be opened later
                      </p>
                    </div>
                    <div className="flex size-12 items-center justify-center rounded-full border border-primary/20 bg-secondary/50 text-primary">
                      <LockKeyhole className="size-5" />
                    </div>
                  </div>

                  <div className="py-7">
                    <p className="font-heading text-lg italic text-primary">
                      Dear {recipient || "someone special"},
                    </p>
                    <p className="mt-5 whitespace-pre-wrap wrap-break-word text-[15px] leading-8 text-foreground/85">
                      {message ||
                        "Your message will appear here, waiting patiently for its special moment."}
                    </p>
                  </div>

                  <div className="border-t border-primary/15 pt-5">
                    <p className="font-heading text-lg italic text-primary">
                      With all my love,
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {sender || "Your name"}
                    </p>
                  </div>

                  <div className="mt-7 flex items-center gap-3 rounded-2xl border border-primary/15 bg-secondary/35 px-4 py-3">
                    <CalendarClock className="size-5 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                        Opens on
                      </p>
                      <p className="truncate text-sm font-semibold text-foreground">
                        {formattedUnlockDate} at {unlockTime || "12:00"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-muted-foreground">
                <LockKeyhole className="size-3.5 text-primary" />
                Sealed with care until the right moment.
              </p>
            </motion.section>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default page;
