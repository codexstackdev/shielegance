"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock3,
  Heart,
  Music2,
  Play,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "@/app/components/Footer";
import { MusicTrack } from "@/hooks/types";
import { createSerenade, searchSongs } from "@/hooks/actions";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import UnlockBtn from "@/app/components/UnlockBtn";

const page = () => {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState<MusicTrack[]>([]);
  const [selectedTrackId, setSelectedTrackId] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const MAX_DURATION_SECONDS = 10 * 60;

  const handleSearchSong = async () => {
    if (search.trim().length === 0) return;
    setIsSearching(true);
    try {
      const data = await searchSongs(search.trim());
      if (data) {
        setSongs(data.items);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  function parseDurationToSeconds(duration: string): number {
    const parts = duration.split(":").map(Number);

    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    }

    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    }

    return 0;
  }

  const filterSong = songs.filter((track) => {
    const durationInSeconds = parseDurationToSeconds(track.duration);
    return durationInSeconds <= MAX_DURATION_SECONDS;
  });

  const selectedTrack =
    filterSong.find((track) => track.id === selectedTrackId) ?? filterSong[0];

  const handleSubmit = async () => {
    if (!recipient || !message || !selectedTrackId) return;
    setLoading(true);
    try {
      const data = await createSerenade(
        recipient,
        message,
        selectedTrackId,
        sender,
      );
      if (data.success) {
        toast.success(data.message);
        setId(data.id);
        setSubmitted(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
            href="/options"
            aria-label="Back to expression options"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to options</span>
          </a>

          <a
            href="/"
            aria-label="Shielegance home"
            className="group absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:rotate-6">
              <Heart className="size-4 fill-current" />
            </span>
            <span className="font-heading text-lg font-semibold tracking-tight">
              shielegance
            </span>
          </a>

          <div className="size-10" />
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-2xl pb-10 pt-10 text-center sm:pt-14"
        >
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-secondary text-primary shadow-sm">
            <Music2 className="size-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Say it with a song
          </p>
          <h1 className="font-heading mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
            Create a serenade
          </h1>
          <p className="font-desc mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Choose the song that carries your feelings, then add the words you
            want them to hear when it plays.
          </p>
        </motion.section>

        <section className="mx-auto grid w-full max-w-6xl gap-6 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="min-w-0 rounded-[1.5rem] border border-border bg-card/75 p-5 shadow-sm backdrop-blur sm:p-7"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Find the feeling
                </p>
                <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight">
                  Search for a song
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                {songs.length} song
                {songs.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="relative mt-6">
              <Search onClick={handleSearchSong} className={`${isSearching && "pointer-events-none"} absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground`} />
              <input
                type="text"
                value={search}
                disabled={isSearching}
                placeholder="Search by title, artist..."
                aria-label="Search music"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.blur();
                    handleSearchSong();
                  }
                }}
                onChange={(event) => setSearch(event.target.value)}
                className="h-12 w-full rounded-full border border-input bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
              {isSearching && (
                <Spinner className="absolute right-4 size-5 top-3.25" />
              )}
            </div>

            <div className="mt-5 customScroll max-h-112 space-y-3 overflow-y-auto overscroll-contain pr-2 sm:max-h-136">
              {filterSong.length > 0 ? (
                filterSong.map((track, index) => {
                  const isSelected = track.id === selectedTrackId;

                  return (
                    <motion.button
                      key={track.id}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.06 }}
                      onClick={() => setSelectedTrackId(track.id)}
                      aria-pressed={isSelected}
                      className={`group flex w-full min-w-0 items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:gap-4 ${isSelected ? "border-primary bg-secondary/45 shadow-sm shadow-primary/10" : "border-border bg-background hover:border-primary/35 hover:bg-muted/40"}`}
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-20">
                        <img
                          src={track?.thumbMedium}
                          alt=""
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-foreground/25 text-background opacity-0 transition-opacity group-hover:opacity-100">
                          <Play className="size-5 fill-current" />
                        </span>
                      </div>

                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 block text-sm font-semibold leading-5 text-foreground">
                          {track.title}
                        </span>
                        <span className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="size-3.5" />
                            {track.duration}
                          </span>
                          <span>{track.viewCount} views</span>
                        </span>
                      </span>

                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors ${isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent group-hover:border-primary/50"}`}
                      >
                        <Check className="size-3.5" />
                      </span>
                    </motion.button>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-muted/35 px-5 py-10 text-center">
                  <Music2 className="mx-auto size-7 text-muted-foreground" />
                  <p className="mt-3 text-sm font-semibold">No songs found</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Try searching for another song or artist.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="min-w-0 lg:sticky lg:top-6"
          >
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Your serenade
              </p>
              <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight">
                Add a little meaning
              </h2>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-md shadow-primary/5">
              {selectedTrack && (
                <div className="relative aspect-[1.9/1] overflow-hidden bg-muted">
                  <img
                    src={selectedTrack.thumbMedium}
                    alt=""
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 text-background">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                      <Music2 className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-background/70">
                        Selected song
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-5">
                        {selectedTrack.title}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      The message
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Let the lyrics set the mood.
                    </p>
                  </div>
                  <Heart className="size-5 shrink-0 fill-primary/15 text-primary" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="serenade-recipient"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      To
                    </label>
                    <input
                      type="text"
                      id="serenade-recipient"
                      value={recipient}
                      onChange={(event) => setRecipient(event.target.value)}
                      placeholder="Their name"
                      autoComplete="off"
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="serenade-sender"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      From (Optional)
                    </label>
                    <input
                      type="text"
                      id="serenade-sender"
                      value={sender}
                      onChange={(event) => setSender(event.target.value)}
                      placeholder="Your name"
                      autoComplete="off"
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="serenade-message"
                      className="text-sm font-semibold text-card-foreground"
                    >
                      Your message
                    </label>
                    <span className="text-xs text-muted-foreground">
                      {message.length}/500
                    </span>
                  </div>
                  <textarea
                    id="serenade-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={500}
                    rows={7}
                    placeholder="Write something they can feel while the song plays..."
                    className="w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-ring focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                <div className="mb-5 rounded-2xl border border-border bg-muted/35 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    Serenade for
                  </p>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {recipient || "Someone special"}
                    <span className="font-normal text-muted-foreground">
                      {sender ? ` · from ${sender}` : ""}
                    </span>
                  </p>
                </div>

                {isSubmitted && id ? (
                  <UnlockBtn path="serenade" unlockUrl={id} />
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {loading ? (
                      <>
                        <Spinner className="size-5" /> Creating serenade
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4" />
                        Continue with this serenade
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default page;
