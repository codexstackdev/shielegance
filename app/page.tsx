"use client";

import brand from "@/assets/brand.jpg";
import { ArrowRight, Heart, Moon, Sparkles, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";
import { getQuotes } from "@/hooks/actions";

const page = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-80 rounded-full bg-secondary/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 size-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-12">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between py-6 sm:py-8"
        >
          <div
            className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground"
            aria-label="Shielegance home"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-6">
              <Heart className="size-4 fill-current" />
            </span>

            <span className="font-heading text-lg tracking-tight">
              ShieLegance
            </span>
          </div>

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

        <section
          id="home"
          className="grid flex-1 items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:py-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="order-2 mx-auto w-full max-w-xl text-center lg:order-1 lg:mx-0 lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-primary" />
              <span>A softer way to say what you feel</span>
            </div>

            <h1 className="font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl">
              Feel deeply.
              <span className="block text-primary">Write beautifully.</span>
            </h1>

            <p className="font-desc mx-auto mt-6 max-w-md text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">
              Create heartfelt love letters, thoughtful messages, and delicate
              words for the people who make your heart flutter.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={() => router.push("/options")}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
              >
                Express your feelings
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-border bg-card/70 px-6 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto"
              >
                Contact Support
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 text-xs text-muted-foreground lg:justify-start">
              <span className="flex -space-x-2">
                <span className="size-7 rounded-full border-2 border-background bg-secondary" />
                <span className="size-7 rounded-full border-2 border-background bg-primary/70" />
                <span className="size-7 rounded-full border-2 border-background bg-accent" />
              </span>
              <span>Made for tender hearts and meaningful words.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-lg"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative aspect-4/5 overflow-hidden rounded-[2rem] border-8 border-card bg-card shadow-2xl shadow-primary/10"
              >
                <img
                  src={brand.src}
                  alt="A romantic Shielegance brand visual"
                  className="size-full object-cover pointer-events-none"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />

                <div className="absolute inset-0 bg-linear-to-t from-foreground/45 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-card/30 bg-background/75 p-4 text-foreground shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <Heart className="size-4 fill-primary text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                      From the heart
                    </span>
                  </div>

                  <p className="font-heading mt-2 text-xl leading-tight">
                    “{getQuotes()}”
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 8, 0], y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 -top-5 flex size-16 items-center justify-center rounded-full border border-border bg-accent text-accent-foreground shadow-lg sm:-right-6 sm:-top-6"
              >
                <Heart className="size-6 fill-current" />
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute -bottom-5 -left-5 -z-10 size-28 rounded-full border border-primary/20 bg-secondary/60 sm:-bottom-7 sm:-left-7 sm:size-36"
              />
            </div>
          </motion.div>
        </section>
        <Footer/>
      </div>
    </main>
  );
};

export default page;
