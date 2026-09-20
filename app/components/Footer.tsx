"use client";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
const Footer = () => {
  return (
    <>
      {" "}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="flex flex-col items-center justify-between gap-3 border-t border-border/70 py-5 text-xs text-muted-foreground sm:flex-row"
      >
        <span>© 2025 - {new Date().getFullYear()} ShieLegance</span>
        <span className="flex items-center gap-1.5">
          Crafted with
          <Heart className="size-3 fill-primary text-primary" />
          for meaningful connections
        </span>
      </motion.footer>
    </>
  );
};

export default Footer;
