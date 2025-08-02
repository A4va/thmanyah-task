"use client"

import { useRef } from "react"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { MediaType } from "@/types/itunes-api";

const mediaTypes: { label: string; type: MediaType }[] = [
    { label: "🎬 أفلام", type: "movie" },
    { label: "🎙️ بودكاست", type: "podcast" },
    { label: "🎵 موسيقى", type: "music" },
    { label: "🎞️ فيديو موسيقي", type: "musicVideo" },
    { label: "📚 كتب صوتية", type: "audiobook" },
    { label: "🎥 أفلام قصيرة", type: "shortFilm" },
    { label: "📺 مسلسلات", type: "tvShow" },
    { label: "🧩 تطبيقات", type: "software" },
    { label: "📖 كتب إلكترونية", type: "ebook" },
]

export default function MediaTypeToggle() {
  const selectedTypeRef = useRef<MediaType>("all")

  const handleChange = (val: string) => {
    if (val) selectedTypeRef.current = val as MediaType
    console.log("Selected media type:", selectedTypeRef.current)
  }

  return (
    <ToggleGroup
      type="single"
      defaultValue={selectedTypeRef.current}
      onValueChange={handleChange}
      className="flex flex-wrap justify-center gap-3 max-w-md text-muted-foreground mt-2"
      dir="rtl"
    >
      {mediaTypes.map((item) => (
        <ToggleGroupItem
          key={item.type}
          value={item.type}
          className="!rounded-full !border-l px-3 py-1 text-xm text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground transition min-w-fit cursor-pointer flex-0 shrink"
          variant="outline"
        >
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
