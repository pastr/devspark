import { Dispatch, useState, useEffect } from "react";
import browser from "webextension-polyfill";

export function useStateStorageSynced<T>(key: string, initialValue: T): [T, Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    browser.storage.sync.get(key).then((storage) => {
      if (storage[key]) {
        setValue(storage[key]);
      }
    });
  }, [key]);

  useEffect(() => {
    browser.storage.sync.set({ [key]: value });
  }, [key, value]);

  return [value, setValue];
}
