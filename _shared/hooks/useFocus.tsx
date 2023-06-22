import { useRef } from "react";

export function useFocus<T extends HTMLInputElement | HTMLTextAreaElement>(): [React.RefObject<T>, (selectText?: boolean) => void] {
  const htmlElRef = useRef<T>(null);
  const setFocus = (selectText?: boolean): void => {
    htmlElRef?.current?.focus?.();

    if (selectText) {
      htmlElRef?.current?.select?.();
    }
  };

  return [htmlElRef, setFocus];
}
