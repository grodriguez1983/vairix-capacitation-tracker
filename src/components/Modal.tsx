"use client";
import { useClickOutside } from "@/hooks/useClickOutside";
import FocusTrap from "focus-trap-react";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({
  children,
  isOpen = false,
  onClose,
  className,
  ...rest
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  useClickOutside(modalContentRef, onClose);

  if (!isOpen) return null;

  const ModalComponent = () => (
    <FocusTrap>
      <div
        className={`fixed top-0 px-4 bottom-0 left-0 right-0 flex items-center justify-center visible overflow-auto bg-neutral-700 bg-opacity-40 z-[99] p-4`}
      >
        <div
          ref={modalContentRef}
          className={`max-w-full md:max-w-2/3 max-h-2/3 p-8 bg-white rounded-md ${className}`}
          {...rest}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  );

  const dialogContainer = document.querySelector("#dialogs");

  return mounted && dialogContainer
    ? createPortal(<ModalComponent />, dialogContainer)
    : null;
};
