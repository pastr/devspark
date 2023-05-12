import { MutableRefObject, useRef } from "react";

export function useFocus(): [any, (selectText?: boolean) => void] {
  const htmlElRef: MutableRefObject<any> = useRef(null);
  const setFocus = (selectText?: boolean): void => {
    htmlElRef?.current?.focus?.();
    if (selectText) {
      htmlElRef?.current?.select?.();
    }
  };

  return [htmlElRef, setFocus];
}
