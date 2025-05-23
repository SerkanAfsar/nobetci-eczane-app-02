import { useEffect, useState } from "react";

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return { matches };
}
