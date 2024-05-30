import { useEffect, useRef } from "react";

function useOutsideRef(
  onOutsideClick: () => void,
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]);

  return ref;
}

export default useOutsideRef;
