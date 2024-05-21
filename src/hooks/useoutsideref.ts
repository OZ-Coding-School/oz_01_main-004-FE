import { useEffect, useRef } from "react";

function useOutsideRef(
  onOutsideClick: () => void
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    // mousedown 이벤트를 사용하여 좀 더 즉각적인 반응을 얻음
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onOutsideClick]); // onOutsideClick 변경 시에만 이벤트 리스너를 다시 설정

  return ref;
}

export default useOutsideRef;
