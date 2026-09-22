"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Heart,
  Mail,
  Moon,
  Sparkles,
  Sun,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import Footer from "@/app/components/Footer";
import { FontId, LetterFont, LetterTemplate, TemplateId } from "@/hooks/types";

const templates: LetterTemplate[] = [
  {
    id: "ribbon",
    name: "Ribbon & Rose",
    description: "Blush paper, graceful type, and a little drama.",
    className: "bg-secondary/55 text-secondary-foreground",
    previewClassName: "rounded-[2rem] border-primary/30",
    ornament: "✦",
  },
  {
    id: "velvet",
    name: "Velvet Midnight",
    description: "A moody, intimate note for your deepest feelings.",
    className: "bg-foreground text-background",
    previewClassName: "rounded-[1rem] border-foreground",
    ornament: "♡",
  },
  {
    id: "paper",
    name: "Dearly Kept",
    description: "Quietly personal, like a letter saved in a drawer.",
    className: "bg-card text-card-foreground",
    previewClassName: "rounded-none border-dashed",
    ornament: "❧",
  },
  {
    id: "postcard",
    name: "Postcard From My Heart",
    description: "Playful, nostalgic, and made for a grand confession.",
    className: "bg-accent/45 text-accent-foreground",
    previewClassName: "rounded-[0.75rem] border-primary/25",
    ornament: "♥",
  },
];

const fonts: LetterFont[] = [
  {
    id: "cormorant",
    name: "Modern Romance",
    description: "Airy and editorial",
    variable: "--font-cormorant",
  },
  {
    id: "ballet",
    name: "Love Note",
    description: "Soft handwritten script",
    variable: "--font-ballet",
  },
  {
    id: "playfair",
    name: "Old Hollywood",
    description: "Polished and dramatic",
    variable: "--font-playfair",
  },
  {
    id: "lora",
    name: "Dearly Kept",
    description: "Warm and literary",
    variable: "--font-lora",
  },
];

const page = () => {
  const { theme, setTheme } = useTheme();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateId>("ribbon");
  const [selectedFont, setSelectedFont] = useState<FontId>("cormorant");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [closing, setClosing] = useState("With all my love");

  const activeTemplate =
    templates.find((template) => template.id === selectedTemplate) ??
    templates[0];
  const activeFont =
    fonts.find((font) => font.id === selectedFont) ?? fonts[0];

  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
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
          <a href="/options" aria-label="Back to expression options" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to options</span>
          </a>

          <a href="/" aria-label="Shielegance home" className="group absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-6">
              <Heart className="size-4 fill-current" />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">shielegance</span>
          </a>

          <button
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle dark mode"
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
        </motion.header>

        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mx-auto max-w-2xl pb-10 pt-10 text-center sm:pt-14">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-secondary text-primary shadow-sm">
            <Mail className="size-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">A little something from the heart</p>
          <h1 className="font-heading mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">Write a love letter</h1>
          <p className="font-desc mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Choose a paper mood and a typeface, then let your feelings take up space.</p>
        </motion.section>

        <section className="mx-auto grid w-full max-w-5xl gap-6 pb-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.2 }} className="rounded-[1.5rem] border border-border bg-card/75 p-5 shadow-sm backdrop-blur sm:p-7">
            <div className="mb-7">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">Your letter</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Make it personal. Make it yours.</p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="recipient" className="text-sm font-semibold text-card-foreground">To</label>
                  <input id="recipient" value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="Their name" autoComplete="off" className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sender" className="text-sm font-semibold text-card-foreground">From</label>
                  <input id="sender" value={sender} onChange={(event) => setSender(event.target.value)} placeholder="Your name" autoComplete="off" className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20" />
                </div>
              </div>

              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-card-foreground">Choose your paper</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {templates.map((template) => {
                    const isSelected = selectedTemplate === template.id;
                    return (
                      <button key={template.id} type="button" onClick={() => setSelectedTemplate(template.id)} aria-pressed={isSelected} className={`group relative min-h-32 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSelected ? "border-primary shadow-md shadow-primary/10" : "border-border hover:border-primary/40"} ${template.className}`}>
                        <span aria-hidden="true" className="absolute -right-2 -top-5 rotate-12 font-serif text-7xl opacity-10 transition-transform duration-300 group-hover:rotate-6">{template.ornament}</span>
                        <span className="relative flex items-center justify-between">
                          <span className="flex size-8 items-center justify-center rounded-full border border-current/20 bg-background/20"><Heart className="size-3.5" /></span>
                          <span className={`flex size-5 items-center justify-center rounded-full border ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-current/25 text-transparent"}`}><Check className="size-3" /></span>
                        </span>
                        <span className="relative mt-5 block text-sm font-semibold">{template.name}</span>
                        <span className="relative mt-1 block text-xs opacity-70">{template.description}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-card-foreground">Choose your typeface</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {fonts.map((font) => {
                    const isSelected = selectedFont === font.id;
                    return (
                      <button key={font.id} type="button" onClick={() => setSelectedFont(font.id)} aria-pressed={isSelected} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isSelected ? "border-primary bg-secondary/50" : "border-border bg-background hover:border-primary/40"}`}>
                        <span style={{ fontFamily: `var(${font.variable})` }} className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-lg text-primary">Aa</span>
                        <span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{font.name}</span><span className="block text-xs text-muted-foreground">{font.description}</span></span>
                        <span className={`flex size-4 items-center justify-center rounded-full border ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent"}`}><Check className="size-2.5" /></span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3"><label htmlFor="message" className="text-sm font-semibold text-card-foreground">Your message</label><span className="text-xs text-muted-foreground">{message.length}/1000</span></div>
                <textarea id="message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={1000} rows={8} placeholder="Write what your heart has been trying to say..." className="w-full resize-none rounded-xl border border-input bg-background px-3 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20" />
              </div>

              <div className="space-y-2">
                <label htmlFor="closing" className="text-sm font-semibold text-card-foreground">Sign-off</label>
                <input id="closing" value={closing} onChange={(event) => setClosing(event.target.value)} placeholder="With all my love" className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20" />
              </div>

              <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><Sparkles className="size-4" />Continue with this letter</button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.3 }} className="lg:sticky lg:top-6">
            <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Live preview</p><h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight">Your letter, beautifully</h2></div><div className="hidden size-10 items-center justify-center rounded-full bg-accent text-accent-foreground sm:flex"><Heart className="size-4 fill-current" /></div></div>

            <div style={{ fontFamily: `var(${activeFont.variable})` }} className={`relative min-h-124 overflow-hidden border p-7 shadow-md transition-all duration-500 sm:p-10 ${activeTemplate.className} ${activeTemplate.previewClassName}`}>
              <div aria-hidden="true" className="absolute -right-10 -top-12 rotate-12 text-8xl text-primary/15">{activeTemplate.ornament}</div>
              <div className="relative">
                <div className="mb-12 flex items-center justify-between border-b border-current/15 pb-5"><div className="flex items-center gap-2"><Heart className="size-4 fill-primary text-primary" /><span className="text-lg font-semibold tracking-tight">shielegance</span></div><span className="text-xs opacity-60">From the heart</span></div>
                <div className="space-y-7">
                  <p className="text-2xl leading-tight">Dear <span className="text-primary">{recipient || "someone special"}</span>,</p>
                  <p className="whitespace-pre-wrap text-base leading-loose opacity-85">{message || "Your heartfelt message will appear here as you write. Take your time and let your feelings guide every word."}</p>
                  <div className="pt-5"><p className="text-xl">{closing || "With all my love"},</p><p className="mt-2 text-sm opacity-60">{sender || "Your name"}</p></div>
                </div>
                <div className="absolute -bottom-20 right-0 rotate-12 text-7xl text-primary/15">♡</div>
              </div>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">{activeTemplate.name} · {activeFont.name}</p>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default page;
