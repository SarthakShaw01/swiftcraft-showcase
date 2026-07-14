import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="pt-24"
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
}
