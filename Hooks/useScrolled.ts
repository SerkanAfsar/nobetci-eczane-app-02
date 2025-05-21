import { useEffect, useState } from "react";

export default function useScrolled(ref?: React.RefObject<HTMLElement | null>) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handler = () => {
      if (ref && ref.current) {
        setIsScrolled(window.scrollY >= ref.current?.clientHeight);
      } else {
        setIsScrolled(window.scrollY > 0);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [ref]);

  return { isScrolled };
}
