"use client";

import React, {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion } from "motion/react";
import {
  Camera,
  CalendarDays,
  Check,
  ChevronRight,
  Heart,
  ImagePlus,
  MapPin,
  MessageCircleHeart,
  Sparkles,
} from "lucide-react";
import { StoryForm } from "@/hooks/types";
import { toast } from "sonner";
import { createKenshie, deleteImage, uploadImage } from "@/hooks/actions";
import UnlockBtn from "@/app/components/UnlockBtn";
import { Spinner } from "@/components/ui/spinner";

const initialStory: StoryForm = {
  yourName: "",
  theirName: "",
  beginning: "",
  firstImpression: "",
  firstMemorableMoment: "",
  littleThings: "",
  importantDate: "",
  challenge: "",
  realization: "",
  favoriteMemory: "",
  loveTruth: "",
  future: "",
};

const page = () => {
  const [story, setStory] = useState<StoryForm>(initialStory);
  const [imagePreview, setImagePreview] = useState("");
  const [rawImage, setRawImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [id, setId] = useState("");

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setStory((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !["image/png", "image/jpeg", "image/webp"].includes(file.type))
      return;
    setRawImage(file);
    setImagePreview((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    if (!story.yourName || !story.theirName || !imagePreview || !rawImage) {
      toast.error("A masterpiece cannot be nameless or faceless");
      return;
    }
    setLoading(true);
    try {
      const url = await uploadImage(rawImage, story.theirName);
      setImageUrl(url.url);
      const data = await createKenshie(
        story.yourName,
        story.theirName,
        url.url,
        story.beginning,
        story.firstImpression,
        story.firstMemorableMoment,
        story.littleThings,
        story.importantDate,
        story.challenge,
        story.realization,
        story.favoriteMemory,
        story.loveTruth,
        story.future,
      );
      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
        setId(data.id);
      } else {
        toast.error(data.message);
        await deleteImage(url.url);
      }
    } catch (error) {
      console.error(error);
      await deleteImage(imageUrl);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-12 -z-10 size-80 rounded-full bg-secondary/70 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-120 -z-10 size-96 rounded-full bg-accent/30 blur-3xl"
        />

        <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <motion.header
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur">
              <Heart className="size-3.5 fill-current" />
              Your love story
              <Heart className="size-3.5 fill-current" />
            </div>
            <h1 className="font-heading mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter sm:text-6xl">
              Tell the story of
              <span className="block text-primary">the two of you.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Every love story has a beginning, tiny details, unexpected turns,
              and moments you never want to forget. Let us keep yours
              beautifully.
            </p>
          </motion.header>

          <div className="mx-auto mt-10 w-full max-w-3xl">
            <motion.form
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.12 }}
              onSubmit={handleSubmit}
              className="min-w-0 rounded-[2rem] border border-border bg-card p-5 shadow-xl shadow-primary/5 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4 border-b border-border pb-6">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    <Sparkles className="size-3.5" />A story worth keeping
                  </p>
                  <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Start from the beginning
                  </h2>
                </div>
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <MessageCircleHeart className="size-5" />
                </div>
              </div>

              <div className="mt-7 space-y-8">
                <section className="space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      01
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        The beginning
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Set the scene for your story.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-sm font-semibold">Your name</span>
                      <input
                        name="yourName"
                        onChange={handleFieldChange}
                        value={story.yourName}
                        placeholder="The one telling the story"
                        className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-sm font-semibold">Their name</span>
                      <input
                        name="theirName"
                        onChange={handleFieldChange}
                        value={story.theirName}
                        placeholder="The one who has your heart"
                        className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                      />
                    </label>
                  </div>

                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <MapPin className="size-4 text-primary" />
                      Where did your story begin?
                    </span>
                    <input
                      name="beginning"
                      onChange={handleFieldChange}
                      value={story.beginning}
                      placeholder="The place, app, event, classroom, or unexpected moment where you first met"
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      What was your first impression of them?
                    </span>
                    <textarea
                      rows={4}
                      name="firstImpression"
                      onChange={handleFieldChange}
                      value={story.firstImpression}
                      placeholder="Tell the honest version—the funny detail, the unexpected feeling, or the thing you noticed first..."
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                </section>

                <section className="space-y-5 border-t border-border pt-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      02
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        The little moments
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        The details that made it real.
                      </p>
                    </div>
                  </div>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      What was your first memorable moment together?
                    </span>
                    <textarea
                      rows={5}
                      name="firstMemorableMoment"
                      onChange={handleFieldChange}
                      value={story.firstMemorableMoment}
                      placeholder="Maybe it was your first date, a long conversation, a shared meal, a silly mistake, or the moment you realized this was becoming something special..."
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      What are the small things they do that you love?
                    </span>
                    <textarea
                      rows={5}
                      name="littleThings"
                      onChange={handleFieldChange}
                      value={story.littleThings}
                      placeholder="The way they say your name, their sleepy voice, how they remember tiny details, the comfort of their presence..."
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <CalendarDays className="size-4 text-primary" />
                      Is there a date you both remember forever?
                    </span>
                    <input
                      type="date"
                      name="importantDate"
                      onChange={handleFieldChange}
                      value={story.importantDate}
                      className="h-12 w-full rounded-2xl border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                </section>

                <section className="space-y-5 border-t border-border pt-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      03
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        The chapters
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Everything that brought you closer.
                      </p>
                    </div>
                  </div>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      What challenge did you overcome together?
                    </span>
                    <textarea
                      rows={5}
                      name="challenge"
                      onChange={handleFieldChange}
                      value={story.challenge}
                      placeholder="Share a season that tested you, and how choosing each other made the difference..."
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      When did you realize you were truly in love?
                    </span>
                    <textarea
                      rows={5}
                      name="realization"
                      onChange={handleFieldChange}
                      value={story.realization}
                      placeholder="Describe the moment, the feeling, or the quiet realization that changed everything..."
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      What is your favorite memory so far?
                    </span>
                    <textarea
                      rows={5}
                      name="favoriteMemory"
                      onChange={handleFieldChange}
                      value={story.favoriteMemory}
                      placeholder="Take us there. What could you see, hear, smell, or feel? Why does this memory still make you smile?"
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                </section>

                <section className="space-y-5 border-t border-border pt-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      04
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        The forever part
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Write what you hope they always know.
                      </p>
                    </div>
                  </div>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      What do you want them to know about your love?
                    </span>
                    <textarea
                      rows={6}
                      name="loveTruth"
                      onChange={handleFieldChange}
                      value={story.loveTruth}
                      placeholder="If they could keep only one truth from this story, what would you want it to be?"
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-sm font-semibold">
                      What are you looking forward to experiencing together?
                    </span>
                    <textarea
                      rows={5}
                      name="future"
                      onChange={handleFieldChange}
                      value={story.future}
                      placeholder="A future home, more adventures, quiet mornings, new cities, growing old, or simply more ordinary days together..."
                      className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15"
                    />
                  </label>
                </section>

                <section className="border-t border-border pt-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      05
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                        Keep one picture
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        A single image to hold the feeling.
                      </p>
                    </div>
                  </div>

                  <label className="group mt-5 flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-primary/35 bg-secondary/25 px-5 py-8 text-center transition-colors hover:bg-secondary/45">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected story preview"
                        className="size-28 rounded-2xl object-cover shadow-lg ring-4 ring-card"
                      />
                    ) : (
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/15 transition-transform duration-300 group-hover:-translate-y-1">
                        <ImagePlus className="size-6" />
                      </div>
                    )}
                    <p className="mt-4 text-sm font-semibold">
                      Add your one story image
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                      PNG, JPG, or WEBP only. One image, no GIFs, up to your
                      preferred file size.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-xs font-semibold text-primary">
                      <Camera className="size-3.5" />
                      Choose image
                    </span>
                  </label>
                </section>

                {isSubmitted ? (
                  <UnlockBtn path="kenshie" unlockUrl={id} />
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {loading ? "Saving your story" : "Save my love story"}
                    {loading ? <Spinner/> : <ChevronRight className="size-4" />}
                  </button>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
