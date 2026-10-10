"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowDown,
  CalendarDays,
  Heart,
  MapPin,
  Quote,
  Sparkles,
  Stars,
  PenLine,
  BookOpen,
} from "lucide-react";
import Footer from "@/app/components/Footer";
import { LoveStory } from "@/hooks/types";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getKenshie } from "@/hooks/actions";
import { toast } from "sonner";

export const StoryWritingLoader = () => (
  <main className="grid min-h-screen place-items-center overflow-hidden bg-background px-5 text-foreground">
    <div className="relative w-full max-w-sm text-center">
      <div
        aria-hidden="true"
        className="absolute -left-16 top-0 size-48 rounded-full bg-secondary/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 bottom-0 size-48 rounded-full bg-accent/30 blur-3xl"
      />
      <div className="relative mx-auto flex size-32 items-end justify-center">
        <motion.div
          animate={{ rotate: [-4, 4, -4], y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-24 w-28 rounded-xl border border-primary/20 bg-card p-4 shadow-xl shadow-primary/10"
        >
          <div className="space-y-2">
            <span className="block h-1.5 w-14 rounded-full bg-primary/25" />
            <span className="block h-1.5 w-20 rounded-full bg-primary/15" />
            <span className="block h-1.5 w-12 rounded-full bg-primary/25" />
          </div>
          <Heart className="absolute -right-3 -top-3 size-7 fill-primary text-primary" />
        </motion.div>
        <motion.div
          animate={{ x: [-4, 3, -4], y: [5, -3, 5], rotate: [-35, -18, -35] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1 right-9 text-primary"
        >
          <PenLine className="size-9" />
        </motion.div>
      </div>
      <div className="relative mt-8 flex items-center justify-center gap-2 text-primary">
        <BookOpen className="size-4" />
        <p className="text-xs font-bold uppercase tracking-[0.2em]">
          Writing your story
        </p>
        <BookOpen className="size-4" />
      </div>
      <h1 className="font-heading relative mt-4 text-3xl font-semibold">
        Gathering your favorite moments...
      </h1>
      <p className="relative mx-auto mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
        A little patience, love. We are arranging every memory into something
        beautiful.
      </p>
      <div className="relative mt-7 flex justify-center gap-1.5">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={{ y: [0, -6, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
            className="size-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </div>
  </main>
);


const page = () => {
  const [story, setStory] = useState<LoveStory | null>(null);
  const param = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    mass: 0.7,
  });
  const heroTextY = useTransform(smoothScroll, [0, 0.3], [0, -90]);
  const sideHeartY = useTransform(smoothScroll, [0, 1], [0, 260]);
  const chapterOneY = useTransform(smoothScroll, [0.18, 0.5], [35, -18]);
  const chapterTwoY = useTransform(smoothScroll, [0.38, 0.72], [35, -22]);
  const coreImageY = useTransform(smoothScroll, [0.66, 1], [120, -24]);
  const coreImageScale = useTransform(smoothScroll, [0.66, 1], [1.12, 1]);
  const coreGlowOpacity = useTransform(smoothScroll, [0.62, 0.9], [0.15, 0.55]);
  const coreRotate = useTransform(smoothScroll, [0.7, 1], [2, 0]);
  const quoteLeftY = useTransform(smoothScroll, [0.2, 0.55], [36, -26]);
  const quoteRightY = useTransform(smoothScroll, [0.2, 0.55], [-20, 34]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getKenshie(param.id);
        if (data.success) {
          setStory(data.kenshie);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [param.id]);

  if (loading) return <StoryWritingLoader />;

function formatDateLabel(dateString: string | undefined | null): string {
  if (!dateString) return "";

  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${dateString}T12:00:00`));
  } catch (error) {
    console.error("Invalid date provided to formatDateLabel:", error);
    return "";
  }
}

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <motion.div
        style={{ scaleX: smoothScroll }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary"
      />
      <section className="relative isolate min-h-[92svh] overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 -z-20 bg-foreground">
          <div className="absolute inset-0 bg-linear-to-br from-foreground via-foreground/95 to-primary/25" />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.25, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-32 top-20 size-128 rounded-full bg-primary blur-3xl"
          />
          <div className="absolute inset-0 bg-linear-to-b from-foreground/10 via-foreground/55 to-foreground" />
        </div>

        <motion.div
          style={{ y: sideHeartY }}
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-28 z-10 rotate-12 text-[12rem] leading-none text-background/10 sm:right-12 sm:text-[17rem]"
        >
          ♥
        </motion.div>
        <motion.div
          style={{ y: sideHeartY }}
          aria-hidden="true"
          className="pointer-events-none absolute -left-3 top-[42%] z-10 -rotate-12 text-7xl text-primary-foreground/20 sm:left-16 sm:text-9xl"
        >
          ✦
        </motion.div>

        <div className="mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col justify-between px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-background/70">
            <span className="flex items-center gap-2">
              <Heart className="size-3.5 fill-primary text-primary" />A story
              worth keeping
            </span>
            <span className="hidden sm:block">Chapter 01 / Forever</span>
          </div>

          <motion.div
            style={{ y: heroTextY }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl pb-10 pt-24 sm:pb-16"
          >
            <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/75">
              <Sparkles className="size-4 text-primary" />
              The story of {story?.yourName} & {story?.theirName}
            </p>
            <h1 className="font-heading max-w-4xl text-6xl font-semibold leading-[0.86] tracking-[-0.07em] sm:text-8xl lg:text-[9.5rem]">
              The place
              <span className="block text-primary">where we began.</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-background/75 sm:text-base">
              <span className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                {story?.beginning}
              </span>
              <span className="hidden size-1 rounded-full bg-background/40 sm:block" />
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" />
                {formatDateLabel(story?.importantDate)}
              </span>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 text-xs text-background/60">
            <ArrowDown className="size-4 animate-bounce text-primary" />
            Scroll slowly through your story
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-36 lg:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/15"
        />
        <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Stars className="size-3.5" />
              The first feeling
            </p>
            <h2 className="font-heading mt-5 max-w-md text-5xl font-semibold leading-[0.92] tracking-tighter sm:text-7xl">
              Before it became a story, it was just a moment.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              Every forever has a first glance, a first conversation, and a
              detail that quietly stays behind in the heart.
            </p>
          </div>

          <div className="relative space-y-16 pl-5 sm:pl-12">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-primary/25" />
            <motion.article
              style={{ y: chapterOneY }}
              initial={{ opacity: 0, x: -35, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                mass: 0.7,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative rounded-[2rem] border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-9"
            >
              <span className="absolute left-[2.15rem] top-8 flex size-4 items-center justify-center rounded-full border-4 border-background bg-primary sm:left-[3.15rem]" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                The first impression
              </p>
              <h3 className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                What I noticed first
              </h3>
              <p className="mt-6 whitespace-pre-wrap wrap-break-word text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                {story?.firstImpression}
              </p>
            </motion.article>

            <motion.article
              style={{ y: chapterTwoY }}
              initial={{ opacity: 0, x: 35, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 18,
                mass: 0.7,
                delay: 0.08,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative rounded-[2rem] border border-primary/20 bg-secondary/35 p-6 shadow-xl shadow-primary/5 sm:p-9"
            >
              <span className="absolute left-[2.15rem] top-8 flex size-4 items-center justify-center rounded-full border-4 border-background bg-primary sm:left-[3.15rem]" />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                The beginning
              </p>
              <h3 className="font-heading mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Where the world changed
              </h3>
              <p className="mt-6 flex items-start gap-2 text-sm font-semibold text-primary sm:text-base">
                <MapPin className="mt-1 size-4 shrink-0" />
                {story?.beginning}
              </p>
              <p className="mt-5 whitespace-pre-wrap wrap-break-word text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                That was the setting. This is the feeling that began there:
              </p>
              <p className="mt-4 whitespace-pre-wrap wrap-break-word text-base leading-8 text-foreground sm:text-lg sm:leading-9">
                {story?.firstMemorableMoment}
              </p>
            </motion.article>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 65, damping: 20, mass: 0.8 }}
        viewport={{ once: true, amount: 0.25 }}
        className="relative overflow-hidden bg-secondary/30 px-4 py-20 sm:px-8 sm:py-36 lg:px-12"
      >
        <motion.div
          style={{ y: quoteLeftY }}
          animate={{ rotate: [-3, 3, -3], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
          className="absolute -left-20 top-12 text-[14rem] leading-none text-primary/10"
        >
          “
        </motion.div>
        <motion.div
          style={{ y: quoteRightY }}
          animate={{ rotate: [4, -4, 4], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
          className="absolute -right-12 bottom-0 text-[16rem] leading-none text-primary/10"
        >
          ♥
        </motion.div>
        <div className="relative mx-auto max-w-4xl text-center">
          <Quote className="mx-auto size-10 text-primary/60" />
          <p className="font-heading mt-8 whitespace-pre-wrap wrap-break-word text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-primary sm:text-6xl">
            {story?.littleThings}
          </p>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            The little things I will always notice
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 65, damping: 20, mass: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto w-full max-w-5xl px-5 py-24 sm:px-8 sm:py-36 lg:px-12"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            <Heart className="size-3.5 fill-current" />
            The chapters we carry
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, amount: 0.4 }}
            className="font-heading mt-5 text-5xl font-semibold leading-[0.92] tracking-tighter sm:text-7xl"
          >
            Love is in the details.
          </motion.h2>
          <div className="mt-12 grid gap-5 text-left sm:grid-cols-3">
            {[
              ["The hard chapter", story?.challenge],
              ["The realization", story?.realization],
              ["The memory I return to", story?.favoriteMemory],
            ].map(([title, copy], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.6 }}
                viewport={{ once: true, amount: 0.35 }}
                className="rounded-[1.75rem] border border-primary/15 bg-card p-5 shadow-lg shadow-primary/5 sm:p-6"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Heart className="size-4 fill-primary/20" />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                  {title}
                </p>
                <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 21, mass: 0.85 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden bg-foreground px-4 py-24 text-background sm:px-8 sm:py-40 lg:px-12"
      >
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
          className="absolute left-[10%] top-16 text-6xl text-primary/70"
        >
          ♥
        </motion.div>
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [4, -4, 4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
          className="absolute right-[12%] top-24 text-5xl text-primary/70"
        >
          ✦
        </motion.div>
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
            <Sparkles className="size-4 text-primary" />
            The promise in the middle of it all
            <Sparkles className="size-4 text-primary" />
          </p>
          <h2 className="font-heading mt-7 text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-8xl">
            If you remember
            <span className="block text-primary">one thing...</span>
          </h2>
          <p className="mx-auto mt-10 max-w-3xl whitespace-pre-wrap wrap-break-word text-2xl leading-10 text-background/85 sm:text-4xl sm:leading-[1.35]">
            {story?.loveTruth}
          </p>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 21, mass: 0.85 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-36 lg:px-12"
      >
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/20">
          <Stars className="size-7" />
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          The next chapter
        </p>
        <h2 className="font-heading mx-auto mt-5 max-w-3xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          There is still so much life left to live together.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl whitespace-pre-wrap wrap-break-word text-base leading-8 text-muted-foreground sm:text-xl sm:leading-9">
          {story?.future}
        </p>
        <div className="mx-auto mt-14 flex max-w-md items-center gap-4 text-left">
          <div className="h-px flex-1 bg-primary/25" />
          <Heart className="size-5 fill-primary text-primary" />
          <div className="h-px flex-1 bg-primary/25" />
        </div>
        <p className="font-heading mt-10 text-2xl italic text-primary sm:text-3xl">
          For {story?.theirName}, with all my love.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          — {story?.yourName}
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 55, damping: 22, mass: 0.9 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden bg-secondary/30 px-4 py-20 sm:px-8 sm:py-36 lg:px-12"
      >
        <motion.div
          style={{ opacity: coreGlowOpacity }}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 z-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/80 blur-2xl transform-gpu"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-4" />
            The heart of your story
            <Sparkles className="size-4" />
          </p>
          <h2 className="font-heading mx-auto mt-6 max-w-3xl text-5xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-8xl">
            And this is the picture
            <span className="block text-primary">I would keep forever.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            The place, the memories, the hard chapters, and every tiny detail
            led here to the people you became together.
          </p>

          <motion.div
            style={{ y: coreImageY, scale: coreImageScale, rotate: coreRotate, contain: "layout paint" }}
            className="mx-auto mt-14 max-w-3xl transform-gpu rounded-[2.5rem] border border-primary/25 bg-card p-2 shadow-2xl shadow-primary/20 will-change-transform sm:p-4"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-background p-2 sm:p-3">
              <div className="relative flex min-h-72 max-h-[80svh] items-center justify-center overflow-hidden rounded-[1.5rem] bg-secondary/45 transform-gpu sm:min-h-112">
                <img
                  src={story?.image}
                  alt={`The core memory of ${story?.yourName} and ${story?.theirName}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="block max-h-[72svh] pointer-events-none w-full max-w-full object-contain object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-foreground/70 via-transparent to-transparent" />
                <motion.div
                  aria-hidden="true"
                  initial={{ x: "-130%", opacity: 0 }}
                  animate={{ x: ["-130%", "130%"], opacity: [0, 0.45, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 transform-gpu bg-linear-to-r from-transparent via-primary/35 to-transparent will-change-transform"
                />
                <motion.div
                  aria-hidden="true"
                  animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute inset-3 transform-gpu rounded-[1.25rem] border border-primary/25 will-change-transform sm:inset-5"
                />
                <div className="absolute bottom-5 left-4 right-4 flex flex-col items-center gap-2 text-center text-background sm:bottom-8 sm:left-8 sm:right-8">
                  <Heart className="size-8 fill-primary text-primary drop-shadow-lg" />
                  <p className="font-heading text-xl italic sm:text-4xl">
                    Our favorite chapter is still being written.
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-background/70 sm:text-xs">
                    {story?.yourName} & {story?.theirName}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
};

export default page;
