"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import Image from "next/image";
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import {
  AlertCircle,
  BookOpen,
  Film,
  Music,
  Search,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { iTunesMediaResult } from "@/types/itunes-api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMediaSearch } from "@/hooks/custom-queries";

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

const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
  hover: {
    scale: 1.05,
    y: -10,
    rotateX: 5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

export const MediaCardSkeleton = () => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    className="h-full"
  >
    <Card className="h-full bg-gradient-to-br from-card to-card/50 border-border/50">
      <CardHeader className="space-y-4">
        <Skeleton className="h-6 w-3/4 mx-auto rounded-full" />
        <Skeleton className="h-4 w-1/2 mx-auto rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-center p-2">
          <Skeleton className="w-full aspect-square rounded-xl" />
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const EmptyState = ({ hasSearchTerm }: { hasSearchTerm: boolean }) => (
  <motion.div
    className="col-span-full flex flex-col items-center justify-center py-24 text-center"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div className="relative mb-8" variants={itemVariants}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="relative bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-8 border border-border/50"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring" as const, stiffness: 300 }}
      >
        {hasSearchTerm ? (
          <AlertCircle className="w-16 h-16 text-muted-foreground" />
        ) : (
          <Search className="w-16 h-16 text-muted-foreground" />
        )}
      </motion.div>
    </motion.div>

    <motion.h3
      className="text-2xl font-bold text-foreground mb-3"
      variants={itemVariants}
    >
      {hasSearchTerm ? "لم يتم العثور على نتائج" : "ابدأ رحلة البحث"}
    </motion.h3>

    <motion.p
      className="text-muted-foreground max-w-lg text-lg leading-relaxed"
      variants={itemVariants}
    >
      {hasSearchTerm
        ? "جرب البحث بكلمات مختلفة أو تحقق من الإملاء للحصول على أفضل النتائج"
        : "اكتشف عالماً من الموسيقى والأفلام والكتب من خلال البحث أعلاه"}
    </motion.p>
  </motion.div>
);

const ErrorState = ({ error }: { error: string }) => (
  <motion.div
    className="col-span-full"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring" as const, stiffness: 200 }}
  >
    <Alert
      variant="destructive"
      className="max-w-lg mx-auto bg-gradient-to-r from-destructive/10 to-destructive/5 border-destructive/20"
    >
      <AlertCircle className="h-5 w-5" />
      <AlertDescription className="text-base">
        حدث خطأ أثناء جلب البيانات:
        <span>{error}</span>
      </AlertDescription>
    </Alert>
  </motion.div>
);

const MediaCard = ({
  item,
  index,
}: {
  item: iTunesMediaResult;
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const {
    trackId,
    trackName,
    collectionName,
    artistName,
    artworkUrl100,
    kind,
    primaryGenreName,
    releaseDate,
  } = item;

  const title = trackName || collectionName || "Untitled";
  const imageAlt = `${title} by ${artistName}`;
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;

  const getMediaIcon = (mediaKind: string) => {
    if (mediaKind?.includes("song") || mediaKind?.includes("music")) {
      return <Music className="w-4 h-4" />;
    }
    if (mediaKind?.includes("movie") || mediaKind?.includes("tv")) {
      return <Film className="w-4 h-4" />;
    }
    if (mediaKind?.includes("book") || mediaKind?.includes("ebook")) {
      return <BookOpen className="w-4 h-4" />;
    }
    return <Music className="w-4 h-4" />;
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      custom={index}
      className="h-full"
    >
      <Link
        href={`/media/${trackId}`}
        className="group block h-full rounded-2xl"
        aria-label={`عرض تفاصيل ${title} للفنان ${artistName}`}
      >
        <Card className="h-full bg-gradient-to-br from-card via-card to-card/80 hover:shadow-2xl transition-all duration-500 group-hover:border-primary/30 overflow-hidden border border-border/50 backdrop-blur-sm  justify-evenly">
          <CardHeader className="pb-4 space-y-3">
            <CardTitle>
              <div className="text-center space-y-3">
                <motion.div
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {getMediaIcon(kind as string)}
                  <span>{primaryGenreName}</span>
                  {releaseYear && (
                    <>
                      <span className="text-primary/60">•</span>
                      <span>{releaseYear}</span>
                    </>
                  )}
                </motion.div>

                <motion.p
                  className="font-bold truncate text-base leading-tight text-foreground text-wrap"
                  title={title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {title}
                </motion.p>

                <motion.p
                  className="text-sm text-muted-foreground truncate font-medium"
                  title={artistName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {artistName}
                </motion.p>
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-0">
            {artworkUrl100 ? (
              <div className="relative">
                <Image
                  src={artworkUrl100.replace("100x100bb", "400x400bb")}
                  alt={imageAlt}
                  title={title}
                  width={400}
                  height={400}
                  className="w-full h-auto rounded-xl object-cover transition-all duration-500 group-hover/image:scale-110"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <motion.div
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring" as const, stiffness: 300 }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
              </div>
            ) : (
              <div className="aspect-square bg-gradient-to-br from-muted via-muted/80 to-muted/50 rounded-xl flex items-center justify-center text-muted-foreground border border-border/30">
                <div className="text-center space-y-2">
                  {getMediaIcon(kind as string)}
                  <p className="text-sm font-medium">لا توجد صورة</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default function ResultsSection() {
  const searchParams = useSearchParams();
  const term = searchParams.get("term") || "";

  const { data, error, isLoading } = useMediaSearch(term);

  return (
    <AnimatePresence>
      {(term || data) && (
        <motion.section
          className="px-6 sm:px-12 lg:px-20 py-20 relative z-10"
          aria-label="نتائج البحث"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            id="results"
          >
            {error?.message ? (
              <ErrorState error={error.message} />
            ) : isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <MediaCardSkeleton key={i} />
              ))
            ) : data?.results?.length === 0 ? (
              <EmptyState hasSearchTerm={!!term} />
            ) : (
              data?.results?.map((item: iTunesMediaResult, index: number) => (
                <MediaCard key={index} item={item} index={index} />
              ))
            )}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
