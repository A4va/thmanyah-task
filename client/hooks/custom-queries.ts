import { fetcher } from "@/lib/fetcher"
import { iTunesSearchResponse } from "@/types/itunes-api"
import { useQuery } from "@tanstack/react-query"

export const useMediaSearch = (term: string) => {
  return useQuery<iTunesSearchResponse, Error>({
    queryKey: ['mediaSearch', term],
    queryFn: async () => await fetcher(`api/media?term=${encodeURIComponent(term)}`),
    enabled: !!term,
  })
}