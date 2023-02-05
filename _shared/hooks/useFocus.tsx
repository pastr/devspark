import { MutableRefObject, useRef } from "react";

export function useFocus(): [any, () => void] {
  const htmlElRef: MutableRefObject<any> = useRef(null);
  const setFocus = (): void => {
    htmlElRef?.current?.focus?.();
  };

  return [htmlElRef, setFocus];
}
