"use client";

import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function InputSearchMedia() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const term = searchParams.get("term") || "";

  const handleClick = () => {
    const queryValue = searchInputRef.current?.value;
    if (queryValue && term !== queryValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("term", queryValue);
      router.push(`?${params.toString()}`, { scroll: false });
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }
  };

  return (
    <>
      <div className="relative">
        <Input
          placeholder="ابحث"
          className="ps-12 text-right"
          ref={searchInputRef}
          defaultValue={term}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 rounded-l-none bg-[linear-gradient(135deg,_#B375FD,_#3BB9FC)] cursor-pointer"
          onClick={handleClick}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <p className="text-muted-foreground ps-12 pt-2 text-sm">
        مثال: اسم الوسيطة أو اسم ناشرها...
      </p>
    </>
  );
}
