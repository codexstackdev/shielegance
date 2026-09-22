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