export type TemplateId = "ribbon" | "velvet" | "paper" | "postcard";
export type FontId = "cormorant" | "ballet" | "playfair" | "lora";


export type LetterTemplate = {
  id: TemplateId;
  name: string;
  description: string;
  className: string;
  previewClassName: string;
  ornament: string;
};

export type LetterFont = {
  id: FontId;
  name: string;
  description: string;
  variable: string;
};

export type LetterData = {
  _id: string;
  recipient: string;
  sender: string;
  selectedTemplate: TemplateId;
  selectedFont: FontId;
  message: string;
  closing: string;
  createdAt: string;
  updatedAt: string;
};

export  type MusicTrack = {
  id: string;
  title: string;
  thumbMedium: string;
  duration: string;
  viewCount: string;
};


export type serenadeProps = {
  recipient: string,
  sender: string,
  title: string,
  message: string,
  songId: string
}

export type CapsuleData = {
  _id: string;
  recipient: string;
  sender: string;
  message: string;
  unlockDate: string;
  unlockTime: string;
  createdAt: string;
  updatedAt: string;
};

export type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};