"use client";

import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import MediaTypeToggle from "./media-type-toggle";
import InputSearchMedia from "./input-search-media";
import { useSearchParams } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const logoVariants = {
  initial: {
    scale: 0.8,
    opacity: 0,
    rotate: -10,
  },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 10,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function HeroSection() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen gap-12 px-6 relative z-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Logo />
      <div className="w-full max-w-lg relative">
        <InputSearchMedia />
      </div>
      <MediaTypeToggle />
      <ResultsInfo />
    </motion.div>
  );
}

function Logo() {
  return (
    <motion.div
      className="flex flex-col items-center space-y-8"
      variants={itemVariants}
    >
      <motion.div
        className="relative group"
        variants={logoVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="absolute inset-8 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl blur-3xl bg-[linear-gradient(135deg,_#B375FD,_#3BB9FC,_#FF6B9D)]"
          animate={{
            opacity: [0, 0.3, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Image
          className="relative transition-all duration-500 group-hover:drop-shadow-2xl"
          src="/logo.svg"
          alt="شعار وسيط"
          width={192}
          height={192}
        />
      </motion.div>

      <motion.div className="text-center space-y-4" variants={itemVariants}>
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
            delay: 0.5,
          }}
        >
          وســـــيـــــط
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-xl sm:text-2xl font-medium bg-gradient-to-r from-muted-foreground to-muted-foreground/70 bg-clip-text"
          variants={itemVariants}
        >
          وسيطك لعالم الوسائط
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function ResultsInfo() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term") || "";

  return (
    <>
      {term && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            نتائج البحث عن:{" "}
            <span className="font-medium text-foreground">
              &quot;{term}&quot;
            </span>
          </p>

        </div>
      )}
    </>
  );
}
