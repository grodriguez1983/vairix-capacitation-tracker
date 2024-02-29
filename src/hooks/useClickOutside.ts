import { RefObject, useEffect } from "react";

/**
 * Hook that detects clicks outside of the referenced element(s).
 * @param {RefObject<HTMLElement> | RefObject<HTMLElement>[]} refs - A reference or an array of references to the DOM element(s) to monitor.
 * @param {() => void} callback - The function to execute when a click outside the element(s) is detected.
 */
function useClickOutside(
  refs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  callback: () => void
): void {
  useEffect(() => {
    const refsArray = Array.isArray(refs) ? refs : [refs];

    // Function to detect clicks outside of the referenced element(s)
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = refsArray.every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node);
      });
      if (isOutside) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
}

export default useClickOutside;
