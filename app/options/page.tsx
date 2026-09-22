"use client";

import Footer from "../components/Footer";
import {
  ArrowRight,
  BookHeart,
  Gift,
  Heart,
  Mail,
  MessageCircleHeart,
  Moon,
  Music2,
  Sparkles,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const feelingOptions = [
  {
    title: "Love Letter",
    description:
      "Turn everything in your heart into a thoughtful letter they can keep forever.",
    icon: Mail,
    featured: true,
    path: "/kenshie/loveLetter",
    available: true,
  },
  {
    title: "Sweet Message",
    description:
      "Create a short and meaningful message for a little moment of affection.",
    icon: MessageCircleHeart,
    featured: false,
    path: "/kenshie/sweetMessage",
    available: false,
  },
  {
    title: "Appreciation Note",
    description:
      "Let someone know how much you notice, value, and appreciate them.",
    icon: Heart,
    featured: false,
    path: "/kenshie/appreciationNote",
    available: false,
  },
  {
    title: "Birthday Wishes",
    description:
      "Make their special day even sweeter with words written from the heart.",
    icon: Gift,
    featured: false,
    path: "/kenshie/birthdayWishes",
    available: false,
  },
  {
    title: "Playlist Dedication",
    description:
      "Pair your feelings with songs that say what words sometimes cannot.",
    icon: Music2,
    featured: false,
    path: "/kenshie/playlistDedication",
    available: false,
  },
  {
    title: "Anniversary Note",
    description:
      "Celebrate a beautiful memory, a shared journey, or another year together.",
    icon: BookHeart,
    featured: false,
    path: "/kenshie/anniversaryNote",
    available: false,
  },
];

const page = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 size-96 rounded-full bg-secondary/60 blur-3xl" />
        <div className="absolute -bottom-48 -right-40 size-112 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 size-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between py-6 sm:py-8"
        >
          <a
            href="/"
            aria-label="Return to Shielegance home"
            className="group flex items-center gap-2"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-6">
              <Heart className="size-4 fill-current" />
            </span>

            <span className="font-heading text-lg font-semibold tracking-tight">
              shieLegance
            </span>
          </a>

          <button
            type="button"
            onClick={() => setTheme((prev) => prev === "light" ? "dark" : "light")}
            aria-label="Toggle dark mode"
            aria-pressed="false"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
        </motion.header>

        <section className="pb-10 pt-10 text-center sm:pb-14 sm:pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-secondary text-primary shadow-sm"
          >
            <Sparkles className="size-5" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            Choose your expression
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading mx-auto mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl"
          >
            How would you like to
            <span className="block text-primary">express your feelings?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-desc mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Choose a beautiful way to put your feelings into words. Something
            thoughtful is always worth taking the time to create.
          </motion.p>
        </section>

        <section
          aria-label="Available ways to express your feelings"
          className="grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {feelingOptions.map((option, index) => {
            const Icon = option.icon;

            return (
              <motion.article
                key={option.title}
                initial={{ opacity: 0, y: 22 }}
                onClick={() => router.push(option.path)}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + index * 0.08,
                  ease: "easeOut",
                }}
                className={`group relative flex min-h-64 flex-col rounded-[1.5rem] border p-6 shadow-sm transition-all duration-300 ${
                  option.featured
                    ? "border-primary/40 bg-card shadow-md shadow-primary/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15"
                    : "border-border bg-card/70 hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-md"
                }`}
              >
                {option.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                    Start here
                  </span>
                )}

                {!option.available && (
                  <span className="absolute right-5 top-5 rounded-full border border-border bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Coming soon
                  </span>
                )}

                <div
                  className={`mb-6 flex size-12 items-center justify-center rounded-2xl ${
                    option.featured
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-primary"
                  }`}
                >
                  <Icon
                    className={`size-5 ${
                      option.featured ? "fill-current" : ""
                    }`}
                  />
                </div>

                <h2 className="font-heading text-2xl font-semibold tracking-tight text-card-foreground">
                  {option.title}
                </h2>

                <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                  {option.description}
                </p>

                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    disabled={!option.available}
                    className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      option.available
                        ? "text-primary hover:text-primary/80"
                        : "cursor-not-allowed text-muted-foreground/60"
                    }`}
                  >
                    {option.available ? "Create now" : "Stay tuned"}
                    {option.available && (
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </section>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mb-16 flex max-w-2xl items-center gap-4 rounded-2xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur sm:p-6"
        >
          <div className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground sm:flex">
            <Heart className="size-4 fill-current" />
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            Not sure where to begin? Start with a love letter. The most
            beautiful words are often the ones we write slowly.
          </p>
        </motion.div>

        <Footer />
      </div>
    </main>
  );
};

export default page;
