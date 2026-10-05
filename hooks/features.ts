import { Mail, Music2, Pill, ScrollText } from "lucide-react";

export const feelingOptions = [
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
    title: "Serenade",
    description:
      "Dedicate a song to someone you love. Pick the track that says what you can't, add a short message if you want, and send them a page that's just theirs to press play on your song, your moment.",
    icon: Music2,
    featured: true,
    path: "/kenshie/serenade",
    available: true,
  },
  {
    title: "Kenshie",
    description:
      "Kenshie is where stories breathe and love unfolds with every scroll. Let your heart wander through chapters filled with whispers, secrets, and moments meant only for you. A journey of emotion, one page at a time.",
    icon: ScrollText,
    featured: false,
    path: "/kenshie/kenshie",
    available: false,
  },
  {
    title: "Love Capsule",
    description:
      "Some words are meant for later. Write a letter today, lock it with a date, and let time do the rest they won't be able to open it until the moment you choose, whether that's your anniversary, a birthday, or the day you finally tell them how you feel. A little patience makes the reveal mean even more.",
    icon: Pill,
    featured: true,
    path: "/kenshie/loveCapsule",
    available: true,
  },
];